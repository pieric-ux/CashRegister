import { Head } from '@inertiajs/react';
import { Card, CardHeader } from '@/Components/ui/card/card';
import { type CashRegisterConfigurationsBkndDatas } from '@/Shared/Types/CashRegisterTypes';
import CashRegisterConfigurationsLayout from '@/Components/layouts/Auth/Customer/CashRegisterConfigurationsLayout';

export default function Dashboard({
    bkndDatas,
}: {
    bkndDatas: CashRegisterConfigurationsBkndDatas;
}): JSX.Element {
    const { cashRegisterModule } = bkndDatas;

    return (
        <CashRegisterConfigurationsLayout cashRegisterModule={cashRegisterModule}>
            <Head title={cashRegisterModule.name} />

            <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
                <Card>
                    <CardHeader>{cashRegisterModule.name}</CardHeader>
                </Card>
            </div>
        </CashRegisterConfigurationsLayout>
    );
}
