'use client';

import i18n from '@/Config/i18n';
import UpdateDish from './UpdateDish';
import DeleteDish from './DeleteDish';
import { type Dish } from '@/Shared/Types/DishTypes';
import { type ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/Components/ui/checkbox/checkbox';
import useCurrencyFormatter from '@/Hooks/useCurrencyFormatter';
import { ColumnHeader } from '@/Components/ui/table/templates/column/columnHeader';
import UpdateItemsPictureForm from '@/Components/forms/Common/UpdateItemsPictureForm';

export const columns: ColumnDef<Dish>[] = [
    {
        id: 'Select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() ? 'indeterminate' : false)
                }
                onCheckedChange={(checked) => table.toggleAllPageRowsSelected(checked === true)}
                aria-label={i18n.t('Select all')}
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(checked) => row.toggleSelected(checked === true)}
                aria-label={i18n.t('Select row')}
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'Picture',
        header: () => {
            return <div className='text-left font-medium'>{i18n.t('Picture')}</div>;
        },
        cell: ({ row }) => {
            const dish = row.original;

            return <UpdateItemsPictureForm item={dish} route={route('picture-dish.upload')} />;
        },
    },
    {
        id: 'Name',
        accessorKey: 'name',
        header: ({ column }) => {
            return <ColumnHeader column={column} title={i18n.t('Name')} />;
        },
    },
    {
        id: 'Unit',
        accessorKey: 'unit',
        header: ({ column }) => {
            return <ColumnHeader column={column} title={i18n.t('Unit')} />;
        },
    },
    {
        id: 'Client Price',
        accessorKey: 'client_price',
        header: ({ column }) => {
            return <ColumnHeader column={column} title={i18n.t('Client Price')} />;
        },
        cell: ({ row }) => {
            const price = row.original.client_price;

            const formatted = useCurrencyFormatter(price);

            return <div className='text-left font-medium'>{formatted}</div>;
        },
    },
    {
        id: 'Cost Price',
        accessorKey: 'cost_price',
        header: ({ column }) => {
            return <ColumnHeader column={column} title={i18n.t('Cost Price')} />;
        },
        cell: ({ row }) => {
            const price = row.original.cost_price;

            const formatted = useCurrencyFormatter(price);

            return <div className='text-left font-medium'>{formatted}</div>;
        },
    },
    {
        id: 'Consigned',
        accessorKey: 'is_consigned',
        header: ({ column }) => {
            return <ColumnHeader column={column} title={i18n.t('Consigned')} />;
        },
        cell: ({ row }) => {
            return (
                <Checkbox
                    className='disabled:cursor-not-allowed disabled:opacity-50'
                    checked={row.original.is_consigned}
                    disabled
                />
            );
        },
    },
    {
        id: 'Sold Separately',
        accessorKey: 'is_soldSeparately',
        header: ({ column }) => {
            return <ColumnHeader column={column} title={i18n.t('Sold Separately')} />;
        },
        cell: ({ row }) => {
            return (
                <Checkbox
                    className='disabled:cursor-not-allowed disabled:opacity-50'
                    checked={row.original.is_soldSeparately}
                    disabled
                />
            );
        },
    },
    {
        id: 'Actions',
        header: () => {
            return <div className='text-left font-medium'>{i18n.t('Actions')}</div>;
        },
        cell: ({ row }) => {
            const dish = row.original;

            return (
                <div className='flex items-center justify-center gap-2'>
                    <UpdateDish dish={dish} />
                    <DeleteDish dish={dish} />
                </div>
            );
        },
    },
];
