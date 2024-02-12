import { useTranslation } from 'react-i18next';
import { Head, usePage } from '@inertiajs/react';
import CreateEmployee from './Components/CreateEmployee';
import { columns } from './Components/EmployeesTableColumn';
import { Card, CardHeader } from '@/Components/ui/card/card';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { DataTable } from '@/Components/ui/table/templates/table/DataTable';
import CashRegisterConfigurationsLayout from '@/Components/layouts/Auth/Customer/CashRegisterConfigurationsLayout';

interface PageProps extends InertiaPageProps {
    cashRegisterModule: CashRegister & {
        cr_employees: Employee[];
    };
}

export default function Index(): JSX.Element {
    const { t } = useTranslation();
    const { cashRegisterModule } = usePage<PageProps>().props;

    const employees = cashRegisterModule.cr_employees;

    return (
        <CashRegisterConfigurationsLayout>
            <Head title={cashRegisterModule.name} />

            <CreateEmployee />

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
        </CashRegisterConfigurationsLayout>
    );
}
