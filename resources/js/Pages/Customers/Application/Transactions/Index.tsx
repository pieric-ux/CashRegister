import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import CR_AppAdminLayout from '@/Layouts/CR_AppAdminLayout';
import { Card, CardHeader } from '@/Components/ui/card/card';
import { DataTable } from '@/Components/ui/table/templates/table/DataTable';
import { getColumns } from '@/Pages/Customers/Application/Transactions/Components/DataTable/TableColumns';

export default function Index({ customerAuth, application, transactions, localization }) {
    const { t } = useTranslation();
    const columns = getColumns();

    return (
        <CR_AppAdminLayout
            auth={customerAuth}
            application={application}
            localization={localization}
        >
            <Head title={application.name} />
            <div className='mx-auto max-w-7xl space-y-6 px-2 sm:px-6 lg:px-8'>
                <Card>
                    <CardHeader>
                        <DataTable
                            columns={columns}
                            data={transactions}
                            filterPlaceholder={t('Search transactions')}
                            textNoData={t('No transactions found.')}
                        />
                    </CardHeader>
                </Card>
            </div>
        </CR_AppAdminLayout>
    );
}
