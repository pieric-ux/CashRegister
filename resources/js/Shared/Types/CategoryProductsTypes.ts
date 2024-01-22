import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';

export interface CategoryProducts {
    id?: number;
    name: string;
    order?: number;
    fk_cr_modules_id?: number;
    created_at?: string;
    updated_at?: string;
}

export interface CategoriesProductsBkndDatas {
    cashRegisterModule: CashRegister & { cr_categories_products: CategoryProducts[] };
}

export interface CategoryProductsFormDatas {
    name: string;
}
