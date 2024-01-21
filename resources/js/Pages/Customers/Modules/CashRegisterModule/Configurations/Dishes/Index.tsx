import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import CreateDish from './Components/CreateDish';
import { columns } from './Components/DishesTableColumn';
import { Card, CardHeader } from '@/Components/ui/card/card';
import { DataTable } from '@/Components/ui/table/templates/table/DataTable';
import CashRegisterConfigurationsLayout from '@/Components/layouts/Auth/Customer/CashRegisterConfigurationsLayout';

export default function Index({ customerAuth, application, dishes, localization }): JSX.Element {
    const { t } = useTranslation();

    const dishesFilter = dishes.filter((dish) => dish.name !== 'No dish');

    return (
        <CashRegisterConfigurationsLayout
            auth={customerAuth}
            application={application}
            localization={localization}
        >
            <Head title={application.name} />

            <div className='mx-auto max-w-7xl space-y-6 px-2 sm:px-6 lg:px-8'>
                <CreateDish application={application} />

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
        </CashRegisterConfigurationsLayout>
    );
}
