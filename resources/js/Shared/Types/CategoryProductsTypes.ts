export interface CategoryProducts {
    id?: number;
    name: string;
    order?: number;
    created_at?: string;
    updated_at?: string;
}

export interface CategoryProductsFormDatas {
    name: 'name';
    label: string;
    isFocused: boolean;
}
