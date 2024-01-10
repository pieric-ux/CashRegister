'use client';

import currencyCodes from 'currency-codes';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from '@tanstack/react-table';

export type DetailsTransaction = {
    quantity: number;
    item_name: string;
    unit: string;
    client_price: number;
};

export const getColumns = (): ColumnDef<DetailsTransaction>[] => {
    const { t } = useTranslation();

    return [
        {
            id: t('QTY'),
            accessorKey: 'quantity',
            header: t('QTY'),
        },
        {
            id: t('Product'),
            accessorKey: 'item_name',
            header: t('Product'),
            cell: ({ row }) => (
                <div className='text-left font-medium'>{`${row.original.item_name} ${row.original.unit}`}</div>
            ),
        },
        {
            id: t('Price'),
            accessorKey: 'client_price',
            header: t('Price'),
            cell: ({ row }) => {
                const price = row.original.client_price;

                const locale = document.documentElement.lang;

                //const currencyCode = currencyCodes.code(userLang);

                const formatted = new Intl.NumberFormat(locale, {
                    style: 'currency',
                    currency: 'USD',
                }).format(price);

                return <div className='text-left font-medium'>{formatted}</div>;
            },
        },
        {
            id: t('Sub-Total'),
            accessorKey: 'sub_total',
            header: t('Sub-Total'),
            cell: ({ row }) => {
                const total = row.original.quantity * row.original.client_price;

                const locale = document.documentElement.lang;

                //const currencyCode = currencyCodes.code(userLang);

                const formatted = new Intl.NumberFormat(locale, {
                    style: 'currency',
                    currency: 'USD',
                }).format(total);

                return <div className='text-left font-medium'>{formatted}</div>;
            },
        },
    ];
};
