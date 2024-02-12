import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { createContext } from 'react';

export const ShowCashRegisterInfosContext = createContext<{
    cashRegisterModule: CashRegister;
}>({
    cashRegisterModule: {} as CashRegister, // FIXME: check type with Flavien
});
