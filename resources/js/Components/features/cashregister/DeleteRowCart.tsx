import { useContext } from 'react';
import { Svg } from '@/Components/ui/svg/Svg';
import { type Row } from '@tanstack/react-table';
import { Button } from '@/Components/ui/button/button';
import { type CartItem } from '@/Shared/Types/CartTypes';
import { CashRegisterContext } from '@/Context/CashRegisterContext';

interface RowProps {
    row: Row<CartItem>;
}

const emptyCartItem = { id: null, name: '', quantity: 0, client_price: 0 };

export default function DeleteRowCart({ row }: RowProps): JSX.Element {
    const { cart, setCart } = useContext(CashRegisterContext);

    const removeFromCart = (): void => {
        const newCart = { ...cart };
        newCart.items = newCart.items.filter((_, index) => index !== row.index);
        newCart.items.push(emptyCartItem);

        newCart.total = newCart.items.reduce(
            (subTotal, item) => subTotal + item.quantity * item.client_price,
            0,
        );

        setCart(newCart);
    };

    return (
        <Button variant={'destructive'} size={'sm_icon'} onClick={removeFromCart}>
            <Svg type={'delete'} variant={'destructive'} size={'sm'} />
        </Button>
    );
}
