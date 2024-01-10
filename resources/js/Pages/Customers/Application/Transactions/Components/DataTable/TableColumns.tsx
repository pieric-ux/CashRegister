'use client';

import currencyCodes from 'currency-codes';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/Components/ui/checkbox/checkbox';
import { ColumnHeader } from '@/Components/ui/table/templates/column/columnHeader';
import ShowDetailsTransaction from '@/Pages/Customers/Application/Transactions/Components/DataTable/TableColumns/ShowDetailsTransactions/ShowDetailsTransaction';
import DeleteTransactionForm from '@/Pages/Customers/Application/Transactions/Components/DataTable/TableColumns/DeleteTransactionForm';

export type Transaction = {
    or_number: string;
    employee: string;
    workstation: string;
    total: number;
    cr_payment_methods: Payment;
};

type Payment = {
    name: string;
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
            id: t('OR Number'),
            accessorKey: 'or_number',
            header: t('OR Number'),
        },
        {
            id: t('Employee'),
            accessorKey: 'employee',
            header: ({ column }) => {
                return <ColumnHeader column={column} title={t('Employee')} />;
            },
        },
        {
            id: t('Workstation'),
            accessorKey: 'workstation',
            header: ({ column }) => {
                return <ColumnHeader column={column} title={t('Workstation')} />;
            },
        },
        {
            id: t('Total'),
            accessorKey: 'total',
            header: ({ column }) => {
                return <ColumnHeader column={column} title={t('Total')} />;
            },
            cell: ({ row }) => {
                const total = row.original.total;

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
            id: t('Payment Method'),
            accessorKey: 'cr_payment_methods',
            header: ({ column }) => {
                return <ColumnHeader column={column} title={t('Payment Method')} />;
            },
            cell: ({ row }) => {
                return (
                    <div className='text-left font-medium'>
                        {row.original.cr_payment_methods?.name}
                    </div>
                );
            },
        },
        {
            id: 'action',
            header: t('Actions'),
            cell: ({ row }) => {
                const transaction = row.original;

                return (
                    <div className='flex items-center justify-center gap-2'>
                        <ShowDetailsTransaction transaction={transaction} />
                        <DeleteTransactionForm transaction={transaction} />
                    </div>
                );
            },
        },
    ];
};
