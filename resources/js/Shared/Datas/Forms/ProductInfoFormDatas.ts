import { type Dish } from '@/Shared/Types/DishTypes';
import { type CategoryProducts } from '@/Shared/Types/CategoryProductsTypes';
import { type Product, type ProductInfosFormDatas } from '@/Shared/Types/ProductTypes';

interface ProductWithType extends Product {
    cr_categories_products: CategoryProducts;
    cr_dishes: Dish;
}

export const getDefaultValues = (product?: ProductWithType): Product => {
    return {
        name: product?.name || '',
        unit: product?.unit || '',
        client_price: product?.client_price || 0,
        cost_price: product?.cost_price || 0,
        category: product?.cr_categories_products?.name || '',
        dish: product?.cr_dishes?.name || '',
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
