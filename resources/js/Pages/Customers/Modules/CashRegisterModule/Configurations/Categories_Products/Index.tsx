import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader } from '@/Components/ui/card/card';
import CreateCategoriesProduct from './Components/CreateCategoriesProduct';
import { type CategoriesProductsBkndDatas } from '@/Shared/Types/CategoryProductsTypes';
import DragDropCategoriesProduct from '@/Components/features/dnd-CategoriesProducts/DragDropCategoriesProduct';
import CashRegisterConfigurationsLayout from '@/Components/layouts/Auth/Customer/CashRegisterConfigurationsLayout';

export default function Index({
    bkndDatas,
}: {
    bkndDatas: CategoriesProductsBkndDatas;
}): JSX.Element {
    const { t } = useTranslation();

    const { cashRegisterModule } = bkndDatas;
    const categoriesProducts = cashRegisterModule.cr_categories_products;

    return (
        <CashRegisterConfigurationsLayout cashRegisterModule={cashRegisterModule}>
            <Head title={cashRegisterModule.name} />

            <div className='mx-auto max-w-7xl space-y-6 px-2 sm:px-6 lg:px-8'>
                <CreateCategoriesProduct />

                {categoriesProducts.length > 1 ? (
                    <DragDropCategoriesProduct categoriesProducts={categoriesProducts} />
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
