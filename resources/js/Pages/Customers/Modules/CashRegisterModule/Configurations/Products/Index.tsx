import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import CreateProduct from './Components/CreateProduct';
import { columns } from './Components/ProductsTableColumns';
import { Card, CardHeader } from '@/Components/ui/card/card';
import { ProductsTableContext } from '@/Context/ProductsTableContext';
import { DataTable } from '@/Components/ui/table/templates/table/DataTable';
import CashRegisterConfigurationsLayout from '@/Components/layouts/Auth/Customer/CashRegisterConfigurationsLayout';

export default function Index({
    customerAuth,
    application,
    products,
    categories,
    dishes,
    localization,
}): JSX.Element {
    const { t } = useTranslation();

    return (
        <CashRegisterConfigurationsLayout
            auth={customerAuth}
            application={application}
            localization={localization}
        >
            <Head title={application.name} />

            <div className='mx-auto max-w-7xl space-y-6 px-2 sm:px-6 lg:px-8'>
                <CreateProduct application={application} />

                <Card>
                    <CardHeader>
                        <ProductsTableContext.Provider value={{ categories, dishes }}>
                            <DataTable
                                columns={columns}
                                data={products}
                                filterPlaceholder={t('Search products')}
                                textNoData={t('No products found.')}
                            />
                        </ProductsTableContext.Provider>
                    </CardHeader>
                </Card>
            </div>
        </CashRegisterConfigurationsLayout>
    );
}
