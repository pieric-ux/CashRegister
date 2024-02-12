import { type Media } from '@/Shared/Types/MediaTypes';

export interface Product {
    id?: number;
    name: string;
    unit: string;
    client_price: number;
    cost_price: number;
    category?: string;
    fk_categories_products_id?: string;
    dish?: string;
    fk_dishes_id?: string;
    created_at?: string;
    updated_at?: string;
    media?: Media[];
}

export interface ProductInfosFormDatas {
    name: 'name' | 'unit' | 'client_price' | 'cost_price';
    label: string;
    isFocused?: boolean;
}
