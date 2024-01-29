import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import CustomerLayout from '@/Components/layouts/Auth/Customer/CustomerLayout';
import { CashRegisterModulesContext } from '@/Context/CashRegisterModulesContext';
import { type CashRegisterModulesBkndDatas } from '@/Shared/Types/CashRegisterTypes';
import CreateCashRegister from '@/Pages/Customers/Modules/CashRegisterModule/Components/CreateCashRegister';
import ShowCashRegisters from '@/Pages/Customers/Modules/CashRegisterModule/Components/ShowCashRegisters';

interface IndexCashRegisterModuleProps {
    bkndDatas: CashRegisterModulesBkndDatas[];
}

export default function Index({ bkndDatas }: IndexCashRegisterModuleProps): JSX.Element {
    const { t } = useTranslation();

    return (
        <CustomerLayout>
            <Head title={t('Applications')} />

            <CashRegisterModulesContext.Provider value={{ bkndDatas }}>
                <CreateCashRegister />
                <ShowCashRegisters />
            </CashRegisterModulesContext.Provider>
        </CustomerLayout>
    );
}
