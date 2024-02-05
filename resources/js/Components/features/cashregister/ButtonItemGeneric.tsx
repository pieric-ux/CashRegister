import { useContext } from 'react';
import { Badge } from '@/Components/ui/badge/badge';
import { Button } from '@/Components/ui/button/button';
import { type CartItem } from '@/Shared/Types/CartTypes';
import { CashRegisterContext } from '@/Context/CashRegisterContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar/avatar';

interface ButtonItemGenericProps {
    data: any;
    isDragging: boolean;
    itemType: string;
}

export default function ButtonItemGeneric({
    data,
    isDragging,
    itemType,
}: ButtonItemGenericProps): JSX.Element {
    const { cart, setCart } = useContext(CashRegisterContext);

    const addToCart = (item: CartItem, itemType: string): void => {
        const newCart = { ...cart };
        let price = item.client_price;

        if (itemType === 'return') {
            price *= -1;
        }

        if (
            item.cr_dishes !== undefined &&
            item.cr_dishes !== null &&
            item.cr_dishes.is_consigned
        ) {
            price += item.cr_dishes.client_price;
        }

        const foundItem = newCart.items.find(
            (cartItem) => cartItem.id === item.id && cartItem.type === itemType,
        );

        if (foundItem !== null && foundItem !== undefined) {
            foundItem.quantity += 1;
        } else {
            const emptyIndex = newCart.items.findIndex((cartItem) => cartItem.id === null);
            if (emptyIndex !== -1) {
                newCart.items[emptyIndex] = {
                    ...item,
                    quantity: 1,
                    client_price: price,
                    type: itemType,
                };
            } else {
                newCart.items.push({ ...item, quantity: 1, client_price: price, type: itemType });
            }
        }

        newCart.total = newCart.items.reduce(
            (subTotal, item) => subTotal + item.quantity * item.client_price,
            0,
        );

        setCart(newCart);
    };

    const getQuantityInCart = (): number | null => {
        const cartItem = cart.items.find(
            (cartItem) => cartItem.id === data.id && cartItem.type === itemType,
        );

        return cartItem !== undefined ? cartItem.quantity : null;
    };

    return (
        <Button
            size={'touchItem'}
            className='relative flex-col'
            disabled={isDragging}
            onClick={() => {
                if (!isDragging) {
                    addToCart(data, itemType);
                }
            }}
        >
            <Avatar variant={'square'}>
                <AvatarImage src={data.picture_url} />
                <AvatarFallback>{data.name}</AvatarFallback>
            </Avatar>
            <p>{data.unit}</p>
            {getQuantityInCart() !== null && (
                <Badge variant={'rounded'} size={'rounded'}>
                    {getQuantityInCart()}
                </Badge>
            )}
        </Button>
    );
}
