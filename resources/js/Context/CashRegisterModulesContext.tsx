import { type Dish } from '@/Shared/Types/DishTypes';
import { type Product } from '@/Shared/Types/ProductTypes';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import { type Workstation } from '@/Shared/Types/WorkstationTypes';
import { type Transaction } from '@/Shared/Types/TransactionTypes';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { createContext, type Dispatch, type SetStateAction } from 'react';
import { type CategoryProducts } from '@/Shared/Types/CategoryProductsTypes';

export const CashRegisterConfigurationsContext = createContext<{
    cashRegisterModule: CashRegister & {
        cr_categories_products?: CategoryProducts[];
        cr_dishes?: Dish[];
        cr_employees?: Employee[];
        cr_products?: Product[];
        cr_workstations?: Workstation[];
        cr_transactions?: Transaction[];
    };
    setCashRegisterModule: Dispatch<
        SetStateAction<
            CashRegister & {
                cr_categories_products?: CategoryProducts[];
                cr_dishes?: Dish[];
                cr_employees?: Employee[];
                cr_products?: Product[];
                cr_workstations?: Workstation[];
                cr_transactions?: Transaction[];
            }
        >
    >;
}>({
    cashRegisterModule: {} as CashRegister, // FIXME: check type with Flavien
    setCashRegisterModule: () => {},
});

export const ShowCashRegisterInfosContext = createContext<{
    cashRegisterModule: CashRegister;
}>({
    cashRegisterModule: {} as CashRegister,
});
