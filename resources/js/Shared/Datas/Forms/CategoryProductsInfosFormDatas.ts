import {
    type CategoryProducts,
    type CategoryProductsFormDatas,
} from '@/Shared/Types/CategoryProductsTypes';

export const getDefaultValues = (
    category: CategoryProducts,
    isUpdate: boolean,
): CategoryProducts => {
    return {
        name: isUpdate ? category?.name : '',
    };
};

export const formDatas: CategoryProductsFormDatas = {
    name: 'name',
    label: 'Category',
    isFocused: true,
};
