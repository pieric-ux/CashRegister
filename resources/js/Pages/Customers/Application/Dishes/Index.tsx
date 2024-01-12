import { Head } from '@inertiajs/react';
import CR_AppAdminLayout from '@/Layouts/CR_AppAdminLayout';
import CreateDishForm from './Components/CreateDishForm/CreateDishForm';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader } from '@/Components/ui/card/card';
import { columns } from './Components/DataTable/TableColumn';
import { DataTable } from '@/Components/ui/table/templates/table/DataTable';

export default function Index({ customerAuth, application, dishes, localization }) {
    const { t } = useTranslation();

    return (
        <CR_AppAdminLayout
            auth={customerAuth}
            application={application}
            localization={localization}
        >
            <Head title={application.name} />

            <div className='mx-auto max-w-7xl space-y-6 px-2 sm:px-6 lg:px-8'>
                <CreateDishForm application={application} />

                <Card>
                    <CardHeader>
                        <DataTable
                            columns={columns}
                            data={dishes}
                            filterPlaceholder={t('Search dishes')}
                            textNoData={t('No dishes found.')}
                        />
                    </CardHeader>
                </Card>
            </div>
        </CR_AppAdminLayout>
    );
}
