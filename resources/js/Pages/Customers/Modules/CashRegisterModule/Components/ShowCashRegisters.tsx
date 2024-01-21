import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader } from '@/Components/ui/card/card';
import ShowCashRegisterInfos from '@/Components/features/show-CashRegister-Infos/ShowCashRegisterInfos';
import {
    CashRegisterModulesContext,
    ShowCashRegisterInfosContext,
} from '@/Context/CashRegisterModulesContext';

export default function ShowCashRegisters(): JSX.Element {
    const { t } = useTranslation();

    const { bkndDatas } = useContext(CashRegisterModulesContext);

    return (
        <>
            {bkndDatas.length > 0 ? (
                <ul className='space-y-4'>
                    {bkndDatas.map(({ cashRegisterModule, posterPath }) => (
                        <li key={cashRegisterModule.id}>
                            <ShowCashRegisterInfosContext.Provider
                                value={{ cashRegisterModule, posterPath }}
                            >
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
