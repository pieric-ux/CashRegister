'use client';

import clsx from 'clsx';
import { useState } from 'react';
import DeleteEmployee from './DeleteEmployee';
import { Input } from '@/Components/ui/input/input';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import { DataTable } from '@/Components/ui/table/templates/table/DataTable';
import { ViewOptions } from '@/Components/ui/table/templates/options/viewOptions';
import { PaginationComplex } from '@/Components/ui/table/templates/pagination/paginationComplex';
import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filterPlaceholder?: string;
    textNoData?: string;
    className?: string;
}

export function EmployeesTable<TData, TValue>({
    className,
    columns,
    data,
    filterPlaceholder,
    textNoData,
}: DataTableProps<TData, TValue>): JSX.Element {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            globalFilter,
            columnVisibility,
            rowSelection,
        },
        getRowId(originalRow) {
            // @ts-expect-error: FIXME:
            return originalRow.id;
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
    });
    const filteredSelectedRowModel = table.getFilteredSelectedRowModel().rowsById;
    const originalRows = Object.values(filteredSelectedRowModel).map((row) => row.original);

    return (
        <div className={clsx('space-y-6', className)}>
            <div className='flex items-center justify-between gap-4'>
                <Input
                    id='globalFilter'
                    value={globalFilter ?? ''}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className='mr-auto max-w-sm'
                    placeholder={filterPlaceholder}
                />

                <DeleteEmployee
                    employees={originalRows as Employee[]}
                    disabled={originalRows.length == 0}
                />

                <ViewOptions table={table} />
            </div>

            <DataTable table={table} columns={columns} textNoData={textNoData} />

            <PaginationComplex table={table} />
        </div>
    );
}
