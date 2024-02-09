import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import CustomerLayout from '@/Components/layouts/Auth/Customer/CustomerLayout';
import ShowCashRegisters from '@/Pages/Customers/Modules/CashRegisterModule/Components/ShowCashRegisters';
import CreateCashRegister from '@/Pages/Customers/Modules/CashRegisterModule/Components/CreateCashRegister';

export default function Index(): JSX.Element {
    const { t } = useTranslation();

    return (
        <CustomerLayout>
            <Head title={t('Applications')} />

            <CreateCashRegister />
            <ShowCashRegisters />
        </CustomerLayout>
    );
}
