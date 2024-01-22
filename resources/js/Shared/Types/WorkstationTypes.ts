import { type Product } from '@/Shared/Types/ProductTypes';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';

export interface Workstation {
    id?: number;
    name: string;
    fk_cr_modules_id?: number;
    created_at?: string;
    updated_at?: string;
}

export interface WorkstationBkndDatas {
    cashRegisterModule: CashRegister & {
        cr_workstations: Workstation[] & {
            cr_employees: Employee[];
            cr_products: Product[];
            generalProducts: Product[];
        };
    };
}

export interface WorkstationInfosFormDatas {
    name: 'name';
    label: string;
    isFocused?: boolean;
}
