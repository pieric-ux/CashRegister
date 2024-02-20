import { useTranslation } from 'react-i18next';
import { Head, usePage } from '@inertiajs/react';
import { type Dish } from '@/Shared/Types/DishTypes';
import CreateProduct from './Components/CreateProduct';
import { type Product } from '@/Shared/Types/ProductTypes';
import { columns } from './Components/ProductsTableColumns';
import { Card, CardHeader } from '@/Components/ui/card/card';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { type CategoryProducts } from '@/Shared/Types/CategoryProductsTypes';
import CashRegisterConfigurationsLayout from '@/Components/layouts/Auth/Customer/CashRegisterConfigurationsLayout';
import { ProductsTable } from './Components/ProductsTable';

interface PageProps extends InertiaPageProps {
    cashRegisterModule: CashRegister & {
        cr_categories_products: CategoryProducts[];
        cr_dishes: Dish[];
        cr_products: Product[];
    };
}

export default function Index(): JSX.Element {
    const { t } = useTranslation();

    const { cashRegisterModule } = usePage<PageProps>().props;
    const products = cashRegisterModule.cr_products;
    return (
        <>
            <Head title={cashRegisterModule.name} />

            <CreateProduct />

            <Card>
                <CardHeader>
                    <ProductsTable
                        columns={columns}
                        data={products}
                        filterPlaceholder={t('Search products')}
                        textNoData={t('No products found.')}
                    />
                </CardHeader>
            </Card>
        </>
    );
}

Index.layout = (page: JSX.Element) => <CashRegisterConfigurationsLayout children={page} />;
