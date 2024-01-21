export interface CategoryProducts {
    id?: number;
    name: string;
    order?: number;
    fk_cr_modules_id?: number;
    created_at?: string;
    updated_at?: string;
}

export interface CategoryProductsFormDatas {
    name: string;
}
