import { Head } from '@inertiajs/react';
import { Card, CardHeader } from '@/Components/ui/card/card';
import { type CashRegisterConfigurationsBkndDatas } from '@/Shared/Types/CashRegisterTypes';
import CashRegisterConfigurationsLayout from '@/Components/layouts/Auth/Customer/CashRegisterConfigurationsLayout';

interface DashboardProps {
    bkndDatas: CashRegisterConfigurationsBkndDatas;
}

export default function Dashboard({ bkndDatas }: DashboardProps): JSX.Element {
    const { cashRegisterModule } = bkndDatas;

    return (
        <CashRegisterConfigurationsLayout cashRegisterModule={cashRegisterModule}>
            <Head title={cashRegisterModule.name} />

            <Card>
                <CardHeader>{cashRegisterModule.name}</CardHeader>
            </Card>
        </CashRegisterConfigurationsLayout>
    );
}
