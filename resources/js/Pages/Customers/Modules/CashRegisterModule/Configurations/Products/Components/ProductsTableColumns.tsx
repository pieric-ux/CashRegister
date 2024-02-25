'use client';

import i18n from '@/Config/i18n';
import UpdateProduct from './UpdateProduct';
import DeleteProduct from './DeleteProduct';
import { type Dish } from '@/Shared/Types/DishTypes';
import { type ColumnDef } from '@tanstack/react-table';
import { type Product } from '@/Shared/Types/ProductTypes';
import { Checkbox } from '@/Components/ui/checkbox/checkbox';
import useCurrencyFormatter from '@/Hooks/useCurrencyFormatter';
import { type CategoryProducts } from '@/Shared/Types/CategoryProductsTypes';
import { ColumnHeader } from '@/Components/ui/table/templates/column/columnHeader';
import UpdateItemsPictureForm from '@/Components/forms/Common/UpdateItemsPictureForm';

interface ProductWithType extends Product {
    cr_categories_products: CategoryProducts;
    cr_dishes: Dish;
}

export const columns: ColumnDef<Product>[] = [
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
            const product = row.original;

            return (
                <UpdateItemsPictureForm
                    key={product.id}
                    item={product}
                    route={route('picture-product.upload')}
                />
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

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { formattedAmount } = useCurrencyFormatter(price);

            return <div className='text-left font-medium'>{formattedAmount}</div>;
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

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { formattedAmount } = useCurrencyFormatter(price);

            return <div className='text-left font-medium'>{formattedAmount}</div>;
        },
    },
    {
        id: 'Category',
        accessorKey: 'cr_categories_products',
        header: ({ column }) => {
            return <ColumnHeader column={column} title={i18n.t('Category')} />;
        },
        cell: ({ row }) => {
            const product = row.original as ProductWithType;
            return (
                <div className='text-left font-medium'>
                    {product.cr_categories_products?.name === 'No category'
                        ? ''
                        : product.cr_categories_products?.name}
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
            const dish = row.original as ProductWithType;
            return (
                <div className='text-left font-medium'>
                    {dish.cr_dishes?.name === 'No dish'
                        ? ''
                        : `${dish.cr_dishes?.name} ${dish.cr_dishes?.unit}`}
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
                    <UpdateProduct product={product as ProductWithType} />
                    <DeleteProduct product={product} />
                </div>
            );
        },
    },
];
