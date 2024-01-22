import clsx from 'clsx';
import axios from 'axios';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle } from '@/Components/ui/card/card';
import CreateCategoriesProduct from './Components/CreateCategoriesProduct';
import UpdateCategoriesProduct from './Components/UpdateCategoriesProduct';
import DeleteCategoriesProduct from './Components/DeleteCategoriesProduct';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { type CategoriesProductsBkndDatas } from '@/Shared/Types/CategoryProductsTypes';
import CashRegisterConfigurationsLayout from '@/Components/layouts/Auth/Customer/CashRegisterConfigurationsLayout';

export default function Index({
    bkndDatas,
}: {
    bkndDatas: CategoriesProductsBkndDatas;
}): JSX.Element {
    const { t } = useTranslation();

    const { cashRegisterModule } = bkndDatas;
    const categoriesProducts = cashRegisterModule.cr_categories_products;

    const [updatedCategories, setUpdatedCategories] = useState(categoriesProducts);

    useEffect(() => {
        setUpdatedCategories(categoriesProducts);
    }, [categoriesProducts]);

    const onDragEnd = async (result) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (destination.index === source.index) {
            return;
        }

        const movedCategory = updatedCategories.splice(source.index, 1)[0];

        updatedCategories.splice(destination.index, 0, movedCategory);

        const updatedCategoriesWithOrder = updatedCategories.map((category, index) => {
            return {
                ...category,
                order: index,
            };
        });

        await axios
            .patch(route('categories.updateDragAndDrop'), {
                categories: updatedCategoriesWithOrder,
            })
            .then(function (response) {
                setUpdatedCategories(response.data.categories);
            });
    };

    return (
        <CashRegisterConfigurationsLayout cashRegisterModule={cashRegisterModule}>
            <Head title={cashRegisterModule.name} />

            <div className='mx-auto max-w-7xl space-y-6 px-2 sm:px-6 lg:px-8'>
                <CreateCategoriesProduct />

                {updatedCategories.length > 1 ? (
                    // TODO: Refactor dnd component
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId='categories'>
                            {(provided, snapshot) => (
                                <ul
                                    className={clsx('mt-4 grid grid-cols-1 gap-4', {
                                        'rounded-md bg-gray-100 transition duration-300 ease-linear dark:bg-gray-900':
                                            snapshot.isDraggingOver,
                                    })}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {updatedCategories.slice(1).map((category, index) => (
                                        <Draggable
                                            key={category.id}
                                            draggableId={`category-${category.id}`}
                                            index={index + 1}
                                        >
                                            {(provided) => (
                                                <Card
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    key={category.id}
                                                >
                                                    <CardHeader
                                                        variant={'flex-row'}
                                                        className='items-center justify-between'
                                                    >
                                                        <CardTitle>{category.name}</CardTitle>
                                                        <div className='flex gap-2'>
                                                            <UpdateCategoriesProduct
                                                                category={category}
                                                            />
                                                            <DeleteCategoriesProduct
                                                                category={category}
                                                            />
                                                        </div>
                                                    </CardHeader>
                                                </Card>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                ) : (
                    <Card>
                        <CardHeader size={'xl'} className='items-center'>
                            {t('No categories of products found.')}
                        </CardHeader>
                    </Card>
                )}
            </div>
        </CashRegisterConfigurationsLayout>
    );
}
