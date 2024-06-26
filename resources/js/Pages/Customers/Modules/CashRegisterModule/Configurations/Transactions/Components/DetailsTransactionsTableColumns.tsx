'use client';

import i18n from '@/Config/i18n';
import { type ColumnDef } from '@tanstack/react-table';
import useCurrencyFormatter from '@/Hooks/useCurrencyFormatter';
import { type DetailTransaction } from '@/Shared/Types/DetailTransactionTypes';

export const columns: ColumnDef<DetailTransaction>[] = [
    {
        id: 'QTY',
        accessorKey: 'quantity',
        header: () => {
            return <div className='text-left font-medium'>{i18n.t('QTY')}</div>;
        },
    },
    {
        id: 'Product',
        accessorKey: 'item_name',
        header: () => {
            return <div className='text-left font-medium'>{i18n.t('Product')}</div>;
        },
        cell: ({ row }) => (
            <div className='text-left font-medium'>{`${row.original.item_name} ${row.original.unit}`}</div>
        ),
    },
    {
        id: 'Price',
        accessorKey: 'client_price',
        header: () => {
            return <div className='text-left font-medium'>{i18n.t('Price')}</div>;
        },
        cell: ({ row }) => {
            const price = row.original.client_price;

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { formattedAmount } = useCurrencyFormatter(price);

            return <div className='text-left font-medium'>{formattedAmount}</div>;
        },
    },
    {
        id: 'Sub-Total',
        accessorKey: 'sub_total',
        header: () => {
            return <div className='text-left font-medium'>{i18n.t('Sub-Total')}</div>;
        },
        cell: ({ row }) => {
            const total = row.original.quantity * row.original.client_price;

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { formattedAmount } = useCurrencyFormatter(total);

            return <div className='text-left font-medium'>{formattedAmount}</div>;
        },
    },
];
