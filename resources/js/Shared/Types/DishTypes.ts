export interface Dish {
    id?: number;
    name: string;
    unit: string;
    client_price: string;
    cost_price: string;
    is_consigned: boolean;
    is_SoldSeparately: boolean;
}

export interface DishInfosFormData {
    name: 'name' | 'unit' | 'client_price' | 'cost_price';
    label: string;
    isFocused?: boolean;
    canBeDisabled?: boolean;
}
