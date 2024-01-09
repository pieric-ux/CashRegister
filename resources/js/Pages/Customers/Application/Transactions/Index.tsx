import { Head } from '@inertiajs/react';
import CR_AppAdminLayout from '@/Layouts/CR_AppAdminLayout';
import { DataTable } from './Partials/Table/Table';
import { getColumns } from './Partials/Table/TableColumns';
import { Card, CardHeader } from '@/Components/ui/card/card';

export default function Index({ customerAuth, application, transactions, localization }) {
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
                        <DataTable columns={columns} data={transactions} />
                    </CardHeader>
                </Card>
            </div>
        </CR_AppAdminLayout>
    );
}
