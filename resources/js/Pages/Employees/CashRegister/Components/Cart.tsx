import { useContext } from 'react';
import { columns } from './CartTableColumns';
import { CashRegisterContext } from '@/Context/CashRegisterContext';
import { CartTable } from '@/Components/ui/table/templates/table/CartTable';

export default function Cart(): JSX.Element {
    const { cart } = useContext(CashRegisterContext);
    return <CartTable columns={columns} data={cart.items} />;
}
