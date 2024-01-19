export interface Dish {
    id?: number;
    name: string;
    unit: string;
    client_price: string; // number
    cost_price: string; // number
    is_consigned: boolean;
    is_SoldSeparately: boolean;
    fk_apps_id?: number;
    created_at?: string;
    updated_at?: string;
}

export interface DishInfosFormDatas {
    name: 'name' | 'unit' | 'client_price' | 'cost_price';
    label: string;
    isFocused?: boolean;
    canBeDisabled?: boolean;
}
