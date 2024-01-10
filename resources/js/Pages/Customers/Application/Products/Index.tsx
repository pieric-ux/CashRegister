import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import CR_AppAdminLayout from '@/Layouts/CR_AppAdminLayout';
import { Card, CardHeader } from '@/Components/ui/card/card';
import { getColumns } from './Components/DataTable/TableColumns';
import { DataTable } from '@/Components/ui/table/templates/table/DataTable';
import CreateProductForm from '@/Pages/Customers/Application/Products/Components/CreateProductForm/CreateProductForm';

export default function Index({
    customerAuth,
    application,
    products,
    categories,
    dishes,
    localization,
}) {
    const { t } = useTranslation();

    const columns = getColumns({ categories, dishes });

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
                        <DataTable
                            columns={columns}
                            data={products}
                            filterPlaceholder={t('Search products')}
                            textNoData={t('No products found.')}
                        />
                    </CardHeader>
                </Card>
            </div>
        </CR_AppAdminLayout>
    );
}
