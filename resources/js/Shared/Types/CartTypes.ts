import { type Dish } from './DishTypes';

export interface CartItem {
    id?: number | null;
    quantity: number;
    name?: string;
    unit?: string;
    client_price: number;
    picture_url?: string;
    type?: string;
    cr_dishes?: Dish;
}

export interface Cart {
    items: CartItem[];
    total: number;
}
