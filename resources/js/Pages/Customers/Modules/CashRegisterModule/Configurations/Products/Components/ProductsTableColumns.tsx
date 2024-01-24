'use client';

import i18n from '@/Config/i18n';
import UpdateProduct from './UpdateProduct';
import DeleteProduct from './DeleteProduct';
import { type ColumnDef } from '@tanstack/react-table';
import { type Product } from '@/Shared/Types/ProductTypes';
import { Checkbox } from '@/Components/ui/checkbox/checkbox';
import useCurrencyFormatter from '@/Hooks/useCurrencyFormatter';
import { ColumnHeader } from '@/Components/ui/table/templates/column/columnHeader';
import { UpdateItemsPictureForm } from '@/Components/forms/Common/UpdateItemsPictureForm';

export const columns: ColumnDef<Product>[] = [
    {
        id: 'Select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label={i18n.t('Select all')}
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
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
            const product = row.original;

            return (
                <UpdateItemsPictureForm item={product} route={route('picture-product.upload')} />
            );
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
        id: 'Category',
        accessorKey: 'cr_categories_products',
        header: ({ column }) => {
            return <ColumnHeader column={column} title={i18n.t('Category')} />;
        },
        cell: ({ row }) => {
            return (
                <div className='text-left font-medium'>
                    {row.original.cr_categories_products?.name === 'No category'
                        ? ''
                        : row.original.cr_categories_products?.name}
                </div>
            );
        },
    },
    {
        id: 'Dish',
        accessorKey: 'cr_dishes',
        header: ({ column }) => {
            return <ColumnHeader column={column} title={i18n.t('Dish')} />;
        },
        cell: ({ row }) => {
            return (
                <div className='text-left font-medium'>
                    {row.original.cr_dishes?.name === 'No dish'
                        ? ''
                        : `${row.original.cr_dishes?.name} ${row.original.cr_dishes?.unit}`}
                </div>
            );
        },
    },
    {
        id: 'Actions',
        header: () => {
            return <div className='text-left font-medium'>{i18n.t('Actions')}</div>;
        },
        cell: ({ row }) => {
            const product = row.original;

            return (
                <div className='flex flex-col items-center justify-center gap-2'>
                    <UpdateProduct product={product} />
                    <DeleteProduct product={product} />
                </div>
            );
        },
    },
];
