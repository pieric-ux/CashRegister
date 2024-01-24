import axios from 'axios';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CategoriesList from './Components/CategoriesList';
import { Card, CardHeader } from '@/Components/ui/card/card';
import CreateCategoriesProduct from './Components/CreateCategoriesProduct';
import { DragDropContext, Droppable, type DropResult } from 'react-beautiful-dnd';
import CashRegisterConfigurationsLayout from '@/Components/layouts/Auth/Customer/CashRegisterConfigurationsLayout';
import {
    type CategoryProducts,
    type CategoriesProductsBkndDatas,
} from '@/Shared/Types/CategoryProductsTypes';

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

    const onDragEnd = async (result: DropResult): Promise<void> => {
        const { destination, source } = result;

        if (destination === null || destination === undefined) {
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
                const updateCategoriesData: CategoryProducts[] = response.data.categories;
                setUpdatedCategories(updateCategoriesData);
            });
    };

    return (
        <CashRegisterConfigurationsLayout cashRegisterModule={cashRegisterModule}>
            <Head title={cashRegisterModule.name} />

            <div className='mx-auto max-w-7xl space-y-6 px-2 sm:px-6 lg:px-8'>
                <CreateCategoriesProduct />

                {updatedCategories.length > 1 ? (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId='categories'>
                            {(provided) => (
                                <CategoriesList
                                    categories={updatedCategories}
                                    provided={provided}
                                />
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
