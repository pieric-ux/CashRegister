import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import CreateDish from './Components/CreateDish';
import { columns } from './Components/DishesTableColumn';
import { Card, CardHeader } from '@/Components/ui/card/card';
import { type DishesBkndDatas } from '@/Shared/Types/DishTypes';
import { DataTable } from '@/Components/ui/table/templates/table/DataTable';
import CashRegisterConfigurationsLayout from '@/Components/layouts/Auth/Customer/CashRegisterConfigurationsLayout';

export default function Index({ bkndDatas }: { bkndDatas: DishesBkndDatas }): JSX.Element {
    const { t } = useTranslation();

    const { cashRegisterModule } = bkndDatas;

    const dishesFilter = cashRegisterModule.cr_dishes
        .filter((dish) => dish.name !== 'No dish')
        .map((dish) => ({
            ...dish,
            is_consigned: Boolean(dish.is_consigned),
            is_soldSeparately: Boolean(dish.is_soldSeparately),
        }));

    return (
        <CashRegisterConfigurationsLayout cashRegisterModule={cashRegisterModule}>
            <Head title={cashRegisterModule.name} />

            <CreateDish />

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
        </CashRegisterConfigurationsLayout>
    );
}
