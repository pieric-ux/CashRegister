import { type CategoryProducts } from '@/Shared/Types/CategoryProductsTypes';

export const getDefaultValues = (
    category: CategoryProducts,
    isUpdate: boolean,
): CategoryProducts => {
    return {
        name: isUpdate ? category?.name : '',
    };
};

export const formDatas = {
    name: 'name',
};
