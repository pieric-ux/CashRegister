import { type Dish, type DishInfosFormData } from '@/Shared/Types/DishTypes';

export const getDefaultValues = (dish: Dish, isUpdate: boolean): Dish => {
    return {
        name: isUpdate ? dish?.name : '',
        unit: isUpdate ? dish?.unit : '',
        client_price: isUpdate ? dish?.client_price : '',
        cost_price: isUpdate ? dish?.cost_price : '',
        is_consigned: isUpdate ? (dish?.is_consigned === 1 ? true : false) : true,
        is_SoldSeparately: isUpdate ? (dish?.is_SoldSeparately === 1 ? true : false) : false,
    };
};

export const formDatas: DishInfosFormData[] = [
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
