import { createContext } from 'react';
import {
    type CashRegister,
    type CashRegisterModulesContextDatas,
} from '@/Shared/Types/CashRegisterTypes';

export const CashRegisterModulesContext = createContext<{
    bkndDatas: CashRegisterModulesContextDatas[];
}>({
    bkndDatas: [],
});

export const ShowCashRegisterInfosContext = createContext<{
    cashRegisterModule: CashRegister;
    posterPath: string;
}>({
    cashRegisterModule: {} as CashRegister,
    posterPath: '',
});
