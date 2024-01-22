import { createContext } from 'react';
import { type Dish } from '@/Shared/Types/DishTypes';
import { type Product } from '@/Shared/Types/ProductTypes';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import { type Transaction } from '@/Shared/Types/TransactionTypes';
import { type CategoryProducts } from '@/Shared/Types/CategoryProductsTypes';
import {
    type CashRegister,
    type CashRegisterModulesBkndDatas,
} from '@/Shared/Types/CashRegisterTypes';

export const CashRegisterModulesContext = createContext<{
    bkndDatas: CashRegisterModulesBkndDatas[];
}>({
    bkndDatas: [],
});

export const CashRegisterConfigurationsContext = createContext<{
    cashRegisterModule: CashRegister & {
        cr_categories_products?: CategoryProducts[];
        cr_dishes?: Dish[];
        cr_employees?: Employee[];
        cr_products?: Product[];
        cr_transactions?: Transaction[];
    };
}>({ cashRegisterModule: {} as CashRegister });

export const ShowCashRegisterInfosContext = createContext<{
    cashRegisterModule: CashRegister;
    posterPath: string;
}>({
    cashRegisterModule: {} as CashRegister,
    posterPath: '',
});
