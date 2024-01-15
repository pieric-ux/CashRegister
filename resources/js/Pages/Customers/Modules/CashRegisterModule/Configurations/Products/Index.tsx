import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader } from '@/Components/ui/card/card';
import { columns } from './Components/DataTable/TableColumns';
import { ProductsTableContext } from '@/Context/ProductsTableContext';
import { DataTable } from '@/Components/ui/table/templates/table/DataTable';
import CR_AppAdminLayout from '@/Components/layouts/Auth/Customer/CR_AppAdminLayout';
import CreateProductForm from '@/Pages/Customers/Modules/CashRegisterModule/Configurations/Products/Components/CreateProductForm/CreateProductForm';

export default function Index({
    customerAuth,
    application,
    products,
    categories,
    dishes,
    localization,
}) {
    const { t } = useTranslation();

    return (
        <CR_AppAdminLayout
            auth={customerAuth}
            application={application}
            localization={localization}
        >
            <Head title={application.name} />

            <div className='mx-auto max-w-7xl space-y-6 px-2 sm:px-6 lg:px-8'>
                <CreateProductForm application={application} />

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
        </CR_AppAdminLayout>
    );
}
