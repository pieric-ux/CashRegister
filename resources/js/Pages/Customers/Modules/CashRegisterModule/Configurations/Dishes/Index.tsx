import { useTranslation } from 'react-i18next';
import { Head, usePage } from '@inertiajs/react';
import CreateDish from './Components/CreateDish';
import { type Dish } from '@/Shared/Types/DishTypes';
import { columns } from './Components/DishesTableColumn';
import { Card, CardHeader } from '@/Components/ui/card/card';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { DataTable } from '@/Components/ui/table/templates/table/DataTable';
import CashRegisterConfigurationsLayout from '@/Components/layouts/Auth/Customer/CashRegisterConfigurationsLayout';

interface PageProps extends InertiaPageProps {
    cashRegisterModule: CashRegister & {
        cr_dishes: Dish[];
    };
}

export default function Index(): JSX.Element {
    const { t } = useTranslation();

    const { cashRegisterModule } = usePage<PageProps>().props;

    const dishesFilter = cashRegisterModule.cr_dishes
        .filter((dish) => dish.name !== 'No dish')
        .map((dish) => ({
            ...dish,
            is_consigned: Boolean(dish.is_consigned),
            is_soldSeparately: Boolean(dish.is_soldSeparately),
        }));

    return (
        <>
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
        </>
    );
}

Index.layout = (page: JSX.Element) => <CashRegisterConfigurationsLayout children={page} />;
