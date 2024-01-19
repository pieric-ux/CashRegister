import { type Product, type ProductInfosFormDatas } from '@/Shared/Types/ProductTypes';

export const getDefaultValues = (product: Product, isUpdate: boolean): Product => {
    return {
        name: isUpdate ? product?.name : '',
        unit: isUpdate ? product?.unit : '',
        client_price: isUpdate ? product?.client_price : 0,
        cost_price: isUpdate ? product?.cost_price : 0,
        category: isUpdate ? product?.fk_categories_products_id : '',
        dish: isUpdate ? product?.fk_dishes_id : '',
    };
};

export const formDatas: ProductInfosFormDatas[] = [
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
    },
    {
        name: 'cost_price',
        label: 'Cost Price',
    },
];
