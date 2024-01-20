import { type Dish, type DishInfosFormDatas } from '@/Shared/Types/DishTypes';

export const getDefaultValues = (dish: Dish, isUpdate: boolean): Dish => {
    return {
        name: isUpdate ? dish?.name : '',
        unit: isUpdate ? dish?.unit : '',
        client_price: isUpdate ? dish?.client_price : 0,
        cost_price: isUpdate ? dish?.cost_price : 0,
        is_consigned: isUpdate ? Boolean(dish?.is_consigned) : true,
        is_SoldSeparately: isUpdate ? Boolean(dish?.is_SoldSeparately) : false,
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
