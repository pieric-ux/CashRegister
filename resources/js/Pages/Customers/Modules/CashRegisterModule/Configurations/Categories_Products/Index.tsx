import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader } from '@/Components/ui/card/card';
import CreateCategoriesProduct from './Components/CreateCategoriesProduct';
import { type CategoriesProductsBkndDatas } from '@/Shared/Types/CategoryProductsTypes';
import DragDropCategoriesProduct from '@/Components/features/dnd-CategoriesProducts/DragDropCategoriesProduct';
import CashRegisterConfigurationsLayout from '@/Components/layouts/Auth/Customer/CashRegisterConfigurationsLayout';

interface IndexCategoriesProductsProps {
    bkndDatas: CategoriesProductsBkndDatas;
}

export default function Index({ bkndDatas }: IndexCategoriesProductsProps): JSX.Element {
    const { t } = useTranslation();

    const { cashRegisterModule } = bkndDatas;
    const categoriesProducts = cashRegisterModule.cr_categories_products;

    return (
        <CashRegisterConfigurationsLayout cashRegisterModule={cashRegisterModule}>
            <Head title={cashRegisterModule.name} />

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
        </CashRegisterConfigurationsLayout>
    );
}
