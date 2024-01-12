'use client';

import i18n from '@/Config/i18n';
import { type ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/Components/ui/checkbox/checkbox';
import { ColumnHeader } from '@/Components/ui/table/templates/column/columnHeader';
import RegenerateEmployeeForm from './TableColumns/RegenerateEmployeeForm';
import UpdateEmployeeForm from './TableColumns/UpdateEmployeeForm';
import DeleteEmployeeForm from './TableColumns/DeleteEmployeeForm';

export interface Employee {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
}

export const columns: ColumnDef<Employee>[] = [
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
        id: 'First Name',
        accessorKey: 'first_name',
        header: () => {
            return <div className='text-left font-medium'>{i18n.t('First Name')}</div>;
        },
    },
    {
        id: 'Last Name',
        accessorKey: 'last_name',
        header: ({ column }) => {
            return <ColumnHeader column={column} title={i18n.t('Last Name')} />;
        },
    },
    {
        id: 'Phone',
        accessorKey: 'phone',
        header: ({ column }) => {
            return <ColumnHeader column={column} title={i18n.t('Phone')} />;
        },
    },
    {
        id: 'Email',
        accessorKey: 'email',
        header: ({ column }) => {
            return <ColumnHeader column={column} title={i18n.t('Email')} />;
        },
    },
    {
        id: 'Actions',
        header: i18n.t('Actions'),
        cell: ({ row }) => {
            const employee = row.original;

            return (
                <div className='flex items-center justify-center gap-2'>
                    <RegenerateEmployeeForm employee={employee} />
                    <UpdateEmployeeForm employee={employee} />
                    <DeleteEmployeeForm employee={employee} />
                </div>
            );
        },
    },
];
