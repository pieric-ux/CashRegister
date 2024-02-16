import { Head, usePage } from '@inertiajs/react';
import { Card, CardHeader } from '@/Components/ui/card/card';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import CashRegisterConfigurationsLayout from '@/Components/layouts/Auth/Customer/CashRegisterConfigurationsLayout';

interface PageProps extends InertiaPageProps {
    cashRegisterModule: CashRegister;
}

export default function Dashboard(): JSX.Element {
    const { cashRegisterModule } = usePage<PageProps>().props;

    return (
        <>
            <Head title={cashRegisterModule.name} />

            <Card>
                <CardHeader>{cashRegisterModule.name}</CardHeader>
            </Card>
        </>
    );
}

Dashboard.layout = (page: JSX.Element) => <CashRegisterConfigurationsLayout children={page} />;
