import { Head, usePage } from '@inertiajs/react';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import TotalRevenue from '@/Components/charts/CashRegisterModule/TotalRevenue';
import PreferredPaymentMethodPie from '@/Components/charts/CashRegisterModule/PreferredPaymentMethodPie';
import CashRegisterConfigurationsLayout from '@/Components/layouts/Auth/Customer/CashRegisterConfigurationsLayout';
import TotalEmployees from '@/Components/charts/CashRegisterModule/TotalEmployees';

interface PageProps extends InertiaPageProps {
    cashRegisterModule: CashRegister;
}

export default function Dashboard(): JSX.Element {
    const { cashRegisterModule } = usePage<PageProps>().props;

    return (
        <>
            <Head title={cashRegisterModule.name} />

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <PreferredPaymentMethodPie />
                <TotalRevenue />
                <TotalEmployees />
            </div>
        </>
    );
}

Dashboard.layout = (page: JSX.Element) => <CashRegisterConfigurationsLayout children={page} />;
