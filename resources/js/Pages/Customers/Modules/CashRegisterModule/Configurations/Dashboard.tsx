import { Head } from '@inertiajs/react';
import { Card, CardHeader } from '@/Components/ui/card/card';
import CashRegisterConfigurationsLayout from '@/Components/layouts/Auth/Customer/CashRegisterConfigurationsLayout';

export default function Dashboard({ customerAuth, application, localization }): JSX.Element {
    return (
        <CashRegisterConfigurationsLayout
            auth={customerAuth}
            application={application}
            localization={localization}
        >
            <Head title={application.name} />

            <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
                <Card>
                    <CardHeader>{application.name}</CardHeader>
                </Card>
            </div>
        </CashRegisterConfigurationsLayout>
    );
}
