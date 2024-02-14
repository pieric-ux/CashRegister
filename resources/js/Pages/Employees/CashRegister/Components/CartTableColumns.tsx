'use client';

import i18n from '@/Config/i18n';
import { type ColumnDef } from '@tanstack/react-table';
import { type CartItem } from '@/Shared/Types/CartTypes';
import useCurrencyFormatter from '@/Hooks/useCurrencyFormatter';
import DeleteRowCart from '@/Components/features/cashregister/DeleteRowCart';

export const columns: ColumnDef<CartItem>[] = [
    {
        id: 'quantity',
        accessorKey: 'quantity',
        header: () => {
            return <div className='text-center font-medium'>{i18n.t('QTY')}</div>;
        },
        cell: ({ row }) => {
            return <div className='text-center font-medium'>{row.original.quantity}</div>;
        },
    },
    {
        id: 'product',
        header: () => {
            return <div className='text-left font-medium'>{i18n.t('Product')}</div>;
        },
        cell: ({ row }) => {
            return (
                <div className='text-left font-medium'>
                    {row.original.name} {row.original.unit}
                </div>
            );
        },
    },
    {
        id: 'price',
        accessorKey: 'client_price',
        header: () => {
            return <div className='text-left font-medium'>{i18n.t('Price')}</div>;
        },
        cell: ({ row }) => {
            const price = row.original.client_price;

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const formatted = useCurrencyFormatter(price);

            return <div className='text-left font-medium'>{formatted}</div>;
        },
    },
    {
        id: 'sub-total',
        header: () => {
            return (
                <div className='hidden text-left font-medium sm:block'>{i18n.t('Sub-Total')}</div>
            );
        },
        cell: ({ row }) => {
            const subTotal = row.original.quantity * row.original.client_price;

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const formatted = useCurrencyFormatter(subTotal);

            return <div className='hidden text-left font-medium sm:block'>{formatted}</div>;
        },
    },
    {
        id: 'Actions',
        header: () => {
            return <div className='text-left font-medium'>#</div>;
        },
        cell: ({ row }) => {
            return <DeleteRowCart row={row} />;
        },
    },
];
