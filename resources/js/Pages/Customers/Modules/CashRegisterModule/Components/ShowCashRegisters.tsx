import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader } from '@/Components/ui/card/card';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { ShowCashRegisterInfosContext } from '@/Context/CashRegisterModulesContext';
import ShowCashRegisterInfos from '@/Components/features/show-CashRegister-Infos/ShowCashRegisterInfos';

interface PageProps extends InertiaPageProps {
    cashRegisterModules: CashRegister[];
}

export default function ShowCashRegisters(): JSX.Element {
    const { t } = useTranslation();
    const { cashRegisterModules } = usePage<PageProps>().props;

    return (
        <>
            {cashRegisterModules.length > 0 ? (
                <ul className='space-y-4'>
                    {cashRegisterModules.map((cashRegisterModule) => (
                        <li key={cashRegisterModule.id}>
                            <ShowCashRegisterInfosContext.Provider value={{ cashRegisterModule }}>
                                <ShowCashRegisterInfos />
                            </ShowCashRegisterInfosContext.Provider>
                        </li>
                    ))}
                </ul>
            ) : (
                <Card>
                    <CardHeader size={'xl'}>{t('No application found.')}</CardHeader>
                </Card>
            )}
        </>
    );
}
