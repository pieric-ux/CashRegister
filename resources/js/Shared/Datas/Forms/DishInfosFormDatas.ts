import { type Dish, type DishInfosFormDatas } from '@/Shared/Types/DishTypes';

export const getDefaultValues = (dish?: Dish): Dish => {
    return {
        name: dish?.name || '',
        unit: dish?.unit || '',
        client_price: dish?.client_price || 0,
        cost_price: dish?.cost_price || 0,
        is_consigned: Boolean(dish?.is_consigned) || true,
        is_soldSeparately: Boolean(dish?.is_soldSeparately) || false,
    };
};

export const formDatas: DishInfosFormDatas[] = [
    {
        name: 'name',
        label: 'Name',
        isFocused: true,
    },
    {
        name: 'unit',
        label: 'Unit',
    },
    {
        name: 'client_price',
        label: 'Client Price',
        canBeDisabled: true,
    },
    {
        name: 'cost_price',
        label: 'Cost Price',
    },
];
