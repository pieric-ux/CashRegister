import { useTranslation } from 'react-i18next';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardHeader } from '@/Components/ui/card/card';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import CreateCategoriesProduct from './Components/CreateCategoriesProduct';
import { type CategoryProducts } from '@/Shared/Types/CategoryProductsTypes';
import DragDropCategoriesProduct from '@/Components/features/dnd-CategoriesProducts/DragDropCategoriesProduct';
import CashRegisterConfigurationsLayout from '@/Components/layouts/Auth/Customer/CashRegisterConfigurationsLayout';

interface PageProps extends InertiaPageProps {
    cashRegisterModule: CashRegister & {
        cr_categories_products: CategoryProducts[];
    };
}

export default function Index(): JSX.Element {
    const { t } = useTranslation();

    const { cashRegisterModule } = usePage<PageProps>().props;
    const categoriesProducts = cashRegisterModule.cr_categories_products;

    return (
        <>
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
        </>
    );
}

Index.layout = (page: JSX.Element) => <CashRegisterConfigurationsLayout children={page} />;
