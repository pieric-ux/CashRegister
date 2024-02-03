import { type Dish } from '@/Shared/Types/DishTypes';
import { type Media } from '@/Shared/Types/MediaTypes';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { type CategoryProducts } from '@/Shared/Types/CategoryProductsTypes';

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
    cr_dishes?: Dish;
    cr_categories_products?: CategoryProducts;
    media?: Media[];
}

export interface ProductsBkndDatas {
    cashRegisterModule: CashRegister & {
        cr_categories_products: CategoryProducts[];
        cr_dishes: Dish[];
        cr_products: Product[];
    };
}

export interface ProductInfosFormDatas {
    name: 'name' | 'unit' | 'client_price' | 'cost_price';
    label: string;
    isFocused?: boolean;
}
