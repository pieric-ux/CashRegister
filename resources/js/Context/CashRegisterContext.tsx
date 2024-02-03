import { type Dish } from '@/Shared/Types/DishTypes';
import { type Cart } from '@/Shared/Types/CartTypes';
import { type Product } from '@/Shared/Types/ProductTypes';
import { createContext, type Dispatch, type SetStateAction } from 'react';
import { type CategoryProducts } from '@/Shared/Types/CategoryProductsTypes';

export const CashRegisterContext = createContext<{
    categories: CategoryProducts[];
    dishes: Dish[];
    products: Product[];
    cart: Cart;
    setCart: Dispatch<SetStateAction<Cart>>;
}>({
    categories: [],
    dishes: [],
    products: [],
    cart: { items: [], total: 0 },
    setCart: () => {},
});
