import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import CreateEmployee from './Components/CreateEmployee';
import { columns } from './Components/EmployeesTableColumn';
import { Card, CardHeader } from '@/Components/ui/card/card';
import { type EmployeesBkndDatas } from '@/Shared/Types/EmployeeTypes';
import { DataTable } from '@/Components/ui/table/templates/table/DataTable';
import CashRegisterConfigurationsLayout from '@/Components/layouts/Auth/Customer/CashRegisterConfigurationsLayout';

interface IndexEmployeesProps {
    bkndDatas: EmployeesBkndDatas;
}

export default function Index({ bkndDatas }: IndexEmployeesProps): JSX.Element {
    const { t } = useTranslation();

    const { cashRegisterModule } = bkndDatas;

    const employees = cashRegisterModule.cr_employees;
    return (
        <CashRegisterConfigurationsLayout cashRegisterModule={cashRegisterModule}>
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
