import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import CreateEmployee from './Components/CreateEmployee';
import { columns } from './Components/EmployeesTableColumn';
import { Card, CardHeader } from '@/Components/ui/card/card';
import { DataTable } from '@/Components/ui/table/templates/table/DataTable';
import CR_AppAdminLayout from '@/Components/layouts/Auth/Customer/CR_AppAdminLayout';

export default function Index({ customerAuth, application, employees, localization }): JSX.Element {
    const { t } = useTranslation();

    return (
        <CR_AppAdminLayout
            auth={customerAuth}
            application={application}
            localization={localization}
        >
            <Head title={application.name} />

            <div className='mx-auto max-w-7xl space-y-6 px-2 sm:px-6 lg:px-8'>
                <CreateEmployee application={application} />

                <Card>
                    <CardHeader>
                        <DataTable
                            columns={columns}
                            data={employees}
                            filterPlaceholder={t('Search employees')}
                            textNoData={t('No employees found.')}
                        />
                    </CardHeader>
                </Card>
            </div>
        </CR_AppAdminLayout>
    );
}
