'use client';

import i18n from '@/Config/i18n';
import currencyCodes from 'currency-codes';
import { type ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/Components/ui/checkbox/checkbox';
import UpdateProductForm from './TableColumns/UpdateProductForm';
import DeleteProductForm from './TableColumns/DeleteProductForm';
import UpdateProdutPicture from './TableColumns/UpdateProductPicture';
import { ColumnHeader } from '@/Components/ui/table/templates/column/columnHeader';

export interface Product {
    name: string;
    unit: string;
    client_price: number;
    cost_price: number;
    cr_categories_products: Category;
    cr_dishes: Dish;
}
interface Category {
    name: string;
}

interface Dish {
    name: string;
    unit: string;
}

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

            return <UpdateProdutPicture product={product} />;
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

            const locale = document.documentElement.lang;

            // const currencyCode = currencyCodes.code(userLang);

            const formatted = new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: 'USD',
            }).format(price);

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

            const locale = document.documentElement.lang;

            // const currencyCode = currencyCodes.code(userLang);

            const formatted = new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: 'USD',
            }).format(price);

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
                    <UpdateProductForm product={product} />
                    <DeleteProductForm product={product} />
                </div>
            );
        },
    },
];
