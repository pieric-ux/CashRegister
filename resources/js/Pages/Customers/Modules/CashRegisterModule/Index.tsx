import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import CustomerLayout from '@/Components/layouts/Auth/Customer/CustomerLayout';
import { CashRegisterModulesContext } from '@/Context/CashRegisterModulesContext';
import { type CashRegisterModulesBkndDatas } from '@/Shared/Types/CashRegisterTypes';
import CreateCashRegister from '@/Pages/Customers/Modules/CashRegisterModule/Components/CreateCashRegister';
import ShowCashRegisters from '@/Pages/Customers/Modules/CashRegisterModule/Components/ShowCashRegisters';

export default function Index({
    bkndDatas,
}: {
    bkndDatas: CashRegisterModulesBkndDatas[];
}): JSX.Element {
    const { t } = useTranslation();

    return (
        <CustomerLayout>
            <Head title={t('Applications')} />

            <div className='mx-auto max-w-7xl space-y-6 px-2 sm:px-6 lg:px-8'>
                <CashRegisterModulesContext.Provider value={{ bkndDatas }}>
                    <CreateCashRegister />
                    <ShowCashRegisters />
                </CashRegisterModulesContext.Provider>
            </div>
        </CustomerLayout>
    );
}
