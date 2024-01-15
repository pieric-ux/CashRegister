import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader } from '@/Components/ui/card/card';
import { DataTable } from '@/Components/ui/table/templates/table/DataTable';
import CR_AppAdminLayout from '@/Components/layouts/Auth/Customer/CR_AppAdminLayout';
import { columns } from '@/Pages/Customers/Modules/CashRegisterModule/Configurations/Transactions/Components/DataTable/TableColumns';

export default function Index({ customerAuth, application, transactions, localization }) {
    const { t } = useTranslation();

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
