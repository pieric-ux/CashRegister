import { type Media } from '@/Shared/Types/MediaTypes';
import { type Workstation } from '@/Shared/Types/WorkstationTypes';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';

export interface Employee {
    id?: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    passwordless?: string;
    logout?: boolean;
    fk_workstations_id?: number;
    created_at?: string;
    updated_at?: string;
    cr_workstations?: Workstation;
    media: Media[];
}

export interface EmployeesBkndDatas {
    cashRegisterModule: CashRegister & { cr_employees: Employee[] };
}

export interface EmployeeProfileFormDatas {
    name: 'first_name' | 'last_name' | 'phone' | 'email';
    label: string;
    isFocused?: boolean;
    type?: string;
}
