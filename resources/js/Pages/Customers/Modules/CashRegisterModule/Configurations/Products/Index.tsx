import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import CreateProduct from './Components/CreateProduct';
import { columns } from './Components/ProductsTableColumns';
import { Card, CardHeader } from '@/Components/ui/card/card';
import { type ProductsBkndDatas } from '@/Shared/Types/ProductTypes';
import { DataTable } from '@/Components/ui/table/templates/table/DataTable';
import CashRegisterConfigurationsLayout from '@/Components/layouts/Auth/Customer/CashRegisterConfigurationsLayout';

export default function Index({ bkndDatas }: { bkndDatas: ProductsBkndDatas }): JSX.Element {
    const { t } = useTranslation();

    const { cashRegisterModule } = bkndDatas;
    const products = cashRegisterModule.cr_products;

    return (
        <CashRegisterConfigurationsLayout cashRegisterModule={cashRegisterModule}>
            <Head title={cashRegisterModule.name} />

            <CreateProduct />

            <Card>
                <CardHeader>
                    <DataTable
                        columns={columns}
                        data={products}
                        filterPlaceholder={t('Search products')}
                        textNoData={t('No products found.')}
                    />
                </CardHeader>
            </Card>
        </CashRegisterConfigurationsLayout>
    );
}
