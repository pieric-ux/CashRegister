'use client';

import currencyCodes from 'currency-codes';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from '@tanstack/react-table';
import UpdateDishForm from './TableColumns/UpdateDishForm';
import DeleteDishForm from './TableColumns/DeleteDishForm';
import { Checkbox } from '@/Components/ui/checkbox/checkbox';
import UpdateDishPicture from './TableColumns/UpdateDishPicture';
import { ColumnHeader } from '@/Components/ui/table/templates/column/columnHeader';

export type Dish = {
    name: string;
    unit: string;
    client_price: number;
    cost_price: number;
    is_consigned: number;
    is_SoldSeparately: number;
};

export const getColumns = (): ColumnDef<Dish>[] => {
    const { t } = useTranslation();

    return [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && 'indeterminate')
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label={t('Select all')}
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label={t('Select row')}
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            id: t('Picture'),
            header: t('Picture'),
            cell: ({ row }) => {
                const dish = row.original;

                return <UpdateDishPicture dish={dish} />;
            },
        },
        {
            id: t('Name'),
            accessorKey: 'name',
            header: ({ column }) => {
                return <ColumnHeader column={column} title={t('Name')} />;
            },
        },
        {
            id: t('Unit'),
            accessorKey: 'unit',
            header: ({ column }) => {
                return <ColumnHeader column={column} title={t('Unit')} />;
            },
        },
        {
            id: t('Client Price'),
            accessorKey: 'client_price',
            header: ({ column }) => {
                return <ColumnHeader column={column} title={t('Client Price')} />;
            },
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
            id: t('Cost Price'),
            accessorKey: 'cost_price',
            header: ({ column }) => {
                return <ColumnHeader column={column} title={t('Cost Price')} />;
            },
            cell: ({ row }) => {
                const price = row.original.cost_price;

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
            id: t('Consigned'),
            accessorKey: 'is_consigned',
            header: ({ column }) => {
                return <ColumnHeader column={column} title={t('Consigned')} />;
            },
            cell: ({ row }) => {
                return (
                    <Checkbox
                        className='disabled:cursor-not-allowed disabled:opacity-50'
                        checked={row.original.is_consigned == 1}
                        disabled
                    />
                );
            },
        },
        {
            id: t('Sold Separately'),
            accessorKey: 'is_SoldSeparately',
            header: ({ column }) => {
                return <ColumnHeader column={column} title={t('Sold Separately')} />;
            },
            cell: ({ row }) => {
                return (
                    <Checkbox
                        className='disabled:cursor-not-allowed disabled:opacity-50'
                        checked={row.original.is_SoldSeparately == 1}
                        disabled
                    />
                );
            },
        },
        {
            id: 'action',
            header: t('Actions'),
            cell: ({ row }) => {
                const dish = row.original;

                return (
                    <div className='flex items-center justify-center gap-2'>
                        <UpdateDishForm dish={dish} />
                        <DeleteDishForm dish={dish} />
                    </div>
                );
            },
        },
    ];
};
