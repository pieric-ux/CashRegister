import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader } from '@/Components/ui/card/card';
import { columns } from './Components/DataTable/TableColumn';
import CreateDishForm from './Components/CreateDishForm/CreateDishForm';
import { DataTable } from '@/Components/ui/table/templates/table/DataTable';
import CR_AppAdminLayout from '@/Components/layouts/Auth/Customer/CR_AppAdminLayout';

export default function Index({ customerAuth, application, dishes, localization }) {
    const { t } = useTranslation();

    const dishesFilter = dishes.filter((dish) => dish.name !== 'No dish');

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
                            data={dishesFilter}
                            filterPlaceholder={t('Search dishes')}
                            textNoData={t('No dishes found.')}
                        />
                    </CardHeader>
                </Card>
            </div>
        </CR_AppAdminLayout>
    );
}
