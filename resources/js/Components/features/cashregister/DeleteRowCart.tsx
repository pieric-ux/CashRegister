import { useContext } from 'react';
import { Svg } from '@/Components/ui/svg/Svg';
import { Button } from '@/Components/ui/button/button';
import { CashRegisterContext } from '@/Context/CashRegisterContext';
import { emptyCartItem } from '@/Pages/Employees/CashRegister/Index';

export default function DeleteRowCart({ row }): JSX.Element {
    const { cart, setCart } = useContext(CashRegisterContext);

    const removeFromCart = (row): void => {
        const newCart = { ...cart };
        newCart.items = newCart.items.filter((item, index) => index !== row.index);
        newCart.items.push(emptyCartItem);

        newCart.total = newCart.items.reduce(
            (subTotal, item) => subTotal + item.quantity * item.client_price,
            0,
        );

        setCart(newCart);
    };

    return (
        <Button variant={'destructive'} size={'sm_icon'} onClick={() => removeFromCart(row)}>
            <Svg type={'delete'} variant={'destructive'} size={'sm'} />
        </Button>
    );
}
