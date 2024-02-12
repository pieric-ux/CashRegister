import { type Cart } from '@/Shared/Types/CartTypes';
import { createContext, type Dispatch, type SetStateAction } from 'react';

export const CashRegisterContext = createContext<{
    cart: Cart;
    setCart: Dispatch<SetStateAction<Cart>>;
}>({
    cart: { items: [], total: 0 },
    setCart: () => {},
});
