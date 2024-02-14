import {
    type CategoryProducts,
    type CategoryProductsFormDatas,
} from '@/Shared/Types/CategoryProductsTypes';

export const getDefaultValues = (category?: CategoryProducts): CategoryProducts => {
    return {
        name: category?.name || '',
    };
};

export const formDatas: CategoryProductsFormDatas = {
    name: 'name',
    label: 'Category',
    isFocused: true,
};
