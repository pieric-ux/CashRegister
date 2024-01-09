'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import currencyCodes from 'currency-codes';
import ShowDetailsTransactionForm from '../ShowDetailsTransactionForm';
import DeleteTransactionForm from '../DeleteTransactionForm';
import { ColumnHeader } from '@/Components/ui/table/reusable/columnHeader';
import { Checkbox } from '@/Components/ui/checkbox/checkbox';

export type Transaction = {
    or_number: string;
    employee: string;
    workstation: string;
    total: number;
    fk_paymentMethods_id: number;
};

export const getColumns = (): ColumnDef<Transaction>[] => {
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
            accessorKey: 'or_number',
            header: t('OR Number'),
        },
        {
            accessorKey: 'employee',
            header: ({ column }) => {
                return <ColumnHeader column={column} title={t('Employee')} />;
            },
        },
        {
            accessorKey: 'workstation',
            header: ({ column }) => {
                return <ColumnHeader column={column} title={t('Workstation')} />;
            },
        },
        {
            accessorKey: 'total',
            header: ({ column }) => {
                return <ColumnHeader column={column} title={t('Total')} />;
            },
            cell: ({ row }) => {
                const total = parseFloat(row.getValue('total'));

                const locale = document.documentElement.lang;

                //const currencyCode = currencyCodes.code(userLang);

                const formatted = new Intl.NumberFormat(locale, {
                    style: 'currency',
                    currency: 'USD',
                }).format(total);

                return <div className='text-left font-medium'>{formatted}</div>;
            },
        },
        {
            accessorKey: 'fk_paymentMethods_id',
            header: ({ column }) => {
                return <ColumnHeader column={column} title={t('Payment Method')} />;
            },
        },
        {
            id: 'action',
            header: t('Actions'),
            cell: ({ row }) => {
                const transaction = row.original;

                return (
                    <div className='flex items-center justify-center gap-2'>
                        <ShowDetailsTransactionForm transaction={transaction} />
                        <DeleteTransactionForm transaction={transaction} />
                    </div>
                );
            },
        },
    ];
};
