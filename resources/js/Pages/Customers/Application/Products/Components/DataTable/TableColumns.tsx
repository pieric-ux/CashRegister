'use client';

import currencyCodes from 'currency-codes';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/Components/ui/checkbox/checkbox';
import UpdateProductForm from './TableColumns/UpdateProductForm';
import DeleteProductForm from './TableColumns/DeleteProductForm';
import { ColumnHeader } from '@/Components/ui/table/templates/column/columnHeader';
import UpdateProdutPicture from './TableColumns/UpdateProductPicture';

export type Product = {
    name: string;
    unit: string;
    client_price: number;
    cost_price: number;
    cr_categories_products: Category;
    cr_dishes: Dish;
};
type Category = {
    name: string;
};

type Dish = {
    name: string;
    unit: string;
};

export const getColumns = ({ categories, dishes }): ColumnDef<Product>[] => {
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
                const product = row.original;

                return <UpdateProdutPicture product={product} />;
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
            id: t('Category'),
            accessorKey: 'cr_categories_products',
            header: ({ column }) => {
                return <ColumnHeader column={column} title={t('Category')} />;
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
            id: t('Dish'),
            accessorKey: 'cr_dishes',
            header: ({ column }) => {
                return <ColumnHeader column={column} title={t('Dish')} />;
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
            id: 'action',
            header: t('Actions'),
            cell: ({ row }) => {
                const product = row.original;

                return (
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <UpdateProductForm
                            product={product}
                            categories={categories}
                            dishes={dishes}
                        />
                        <DeleteProductForm product={product} />
                    </div>
                );
            },
        },
    ];
};
