import { usePage } from '@inertiajs/react';
import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import { type Workstation } from '@/Shared/Types/WorkstationTypes';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card/card';

interface PageProps extends InertiaPageProps {
    cashRegisterModule: CashRegister & {
        cr_workstations: (Workstation & { cr_employees: Employee[] })[];
    };
}

export default function TotalEmployees() {
    const { t } = useTranslation();
    const { cashRegisterModule } = usePage<PageProps>().props;

    const getCountEmployees = cashRegisterModule.cr_workstations.reduce(
        (count, workstation) => count + workstation.cr_employees.length,
        0,
    );

    return (
        <Card>
            <CardHeader>
                <div className='flex items-center justify-between'>
                    <CardTitle>{t('Employees')}</CardTitle>
                    <Svg type='employees' variant='sideBar' />
                </div>
            </CardHeader>
            <CardContent>
                <div className='text-2xl font-bold'>{getCountEmployees}</div>
            </CardContent>
        </Card>
    );
}
