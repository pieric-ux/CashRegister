import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import CR_AppAdminLayout from '@/Layouts/CR_AppAdminLayout';
import { Card, CardHeader } from '@/Components/ui/card/card';
import { columns } from './Components/DataTable/TableColumns';
import { DataTable } from '@/Components/ui/table/templates/table/DataTable';
import CreateEmployeeForm from './Components/CreateEmployeeForm/CreateEmployeeForm';

export default function Index({ customerAuth, application, employees, localization }) {
    const { t } = useTranslation();

    return (
        <CR_AppAdminLayout
            auth={customerAuth}
            application={application}
            localization={localization}
        >
            <Head title={application.name} />

            <div className='mx-auto max-w-7xl space-y-6 px-2 sm:px-6 lg:px-8'>
                <CreateEmployeeForm application={application} />

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
