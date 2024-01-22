import { type Media } from '@/Shared/Types/MediaTypes';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';

export interface Dish {
    id?: number;
    name: string;
    unit: string;
    client_price: number;
    cost_price: number;
    is_consigned: boolean;
    is_soldSeparately: boolean;
    fk_cr_modules_id?: number;
    created_at?: string;
    updated_at?: string;
    media?: Media[];
}

export interface DishesBkndDatas {
    cashRegisterModule: CashRegister & { cr_dishes: Dish[] };
}

export interface DishInfosFormDatas {
    name: 'name' | 'unit' | 'client_price' | 'cost_price';
    label: string;
    isFocused?: boolean;
    canBeDisabled?: boolean;
}
