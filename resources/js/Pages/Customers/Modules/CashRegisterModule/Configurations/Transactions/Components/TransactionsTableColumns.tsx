'use client';

import i18n from '@/Config/i18n';
import { type ColumnDef } from '@tanstack/react-table';
import DeleteTransaction from './DeleteTransaction';
import { Checkbox } from '@/Components/ui/checkbox/checkbox';
import ShowDetailsTransaction from './ShowDetailsTransaction';
import useCurrencyFormatter from '@/Hooks/useCurrencyFormatter';
import { ColumnHeader } from '@/Components/ui/table/templates/column/columnHeader';
import { type TransactionsTableColumnsDatas } from '@/Shared/Types/TransactionTypes';

export const columns: ColumnDef<TransactionsTableColumnsDatas>[] = [
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
        id: 'OR Number',
        accessorKey: 'or_number',
        header: () => {
            return <div className='text-left font-medium'>{i18n.t('OR Number')}</div>;
        },
    },
    {
        id: 'Employee',
        accessorKey: 'employee',
        header: ({ column }) => {
            return <ColumnHeader column={column} title={i18n.t('Employee')} />;
        },
    },
    {
        id: 'Workstation',
        accessorKey: 'workstation',
        header: ({ column }) => {
            return <ColumnHeader column={column} title={i18n.t('Workstation')} />;
        },
    },
    {
        id: 'Total',
        accessorKey: 'total',
        header: ({ column }) => {
            return <ColumnHeader column={column} title={i18n.t('Total')} />;
        },
        cell: ({ row }) => {
            const total = row.original.total;

            const formatted = useCurrencyFormatter(total);

            return <div className='text-left font-medium'>{formatted}</div>;
        },
    },
    {
        id: 'Payment Method',
        accessorKey: 'cr_payment_methods',
        header: ({ column }) => {
            return <ColumnHeader column={column} title={i18n.t('Payment Method')} />;
        },
        cell: ({ row }) => {
            return (
                <div className='text-left font-medium'>{row.original.cr_payment_methods?.name}</div>
            );
        },
    },
    {
        id: 'Actions',
        header: i18n.t('Actions'),
        cell: ({ row }) => {
            const transaction = row.original;

            return (
                <div className='flex items-center justify-center gap-2'>
                    <ShowDetailsTransaction transaction={transaction} />
                    <DeleteTransaction transaction={transaction} />
                </div>
            );
        },
    },
];
