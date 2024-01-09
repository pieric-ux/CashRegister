import clsx from 'clsx';
import axios from 'axios';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CR_AppAdminLayout from '@/Layouts/CR_AppAdminLayout';
import { Card, CardHeader, CardTitle } from '@/Components/ui/card/card';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import CreateCategorieProductForm from '@/Pages/Customers/Application/Categories_Products/Partials/CreateCategorieProductForm';
import UpdateCategorieProductForm from '@/Pages/Customers/Application/Categories_Products/Partials/UpdateCategorieProductFrom';
import DeleteCategorieProductForm from '@/Pages/Customers/Application/Categories_Products/Partials/DeleteCategorieProductForm';

export default function Index({ customerAuth, application, categories, localization }) {
    const { t } = useTranslation();

    const [updatedCategories, setUpdatedCategories] = useState(categories);

    useEffect(() => {
        setUpdatedCategories(categories);
    }, [categories]);

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
        <CR_AppAdminLayout
            auth={customerAuth}
            application={application}
            localization={localization}
        >
            <Head title={application.name} />

            <div className='mx-auto max-w-7xl space-y-6 px-2 sm:px-6 lg:px-8'>
                <CreateCategorieProductForm application={application} />

                {updatedCategories.length > 1 ? (
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
                                                            <UpdateCategorieProductForm
                                                                category={category}
                                                            />
                                                            <DeleteCategorieProductForm
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
        </CR_AppAdminLayout>
    );
}
