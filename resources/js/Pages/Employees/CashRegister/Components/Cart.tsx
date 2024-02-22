import { useContext } from 'react';
import { CartTable } from './CartTable';
import { columns } from './CartTableColumns';
import { CashRegisterContext } from '@/Context/CashRegisterContext';

export default function Cart(): JSX.Element {
    const { cart } = useContext(CashRegisterContext);
    return <CartTable columns={columns} data={cart.items} />;
}
