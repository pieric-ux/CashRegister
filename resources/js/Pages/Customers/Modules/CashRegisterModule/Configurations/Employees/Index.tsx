import { useTranslation } from 'react-i18next';
import { Head, usePage } from '@inertiajs/react';
import CreateEmployee from './Components/CreateEmployee';
import { columns } from './Components/EmployeesTableColumn';
import { EmployeesTable } from './Components/EmployeesTable';
import { Card, CardHeader } from '@/Components/ui/card/card';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
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
        <>
            <Head title={cashRegisterModule.name} />

            <CreateEmployee />

            <Card>
                <CardHeader>
                    <EmployeesTable
                        columns={columns}
                        data={employees}
                        filterPlaceholder={t('Search employees')}
                        textNoData={t('No employees found.')}
                    />
                </CardHeader>
            </Card>
        </>
    );
}

Index.layout = (page: JSX.Element) => <CashRegisterConfigurationsLayout children={page} />;
