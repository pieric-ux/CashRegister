import Pagination from './Pagination';
import RowsPerPage from './RowsPerPage';
import RowsSelected from './RowsSelected';
import { type Table } from '@tanstack/react-table';

export interface TablePaginationProps<TData> {
    table: Table<TData>;
}

export function PaginationComplex<TData>({ table }: TablePaginationProps<TData>): JSX.Element {
    return (
        <div className='flex flex-col items-stretch gap-4 sm:flex-row sm:justify-between'>
            <div className='flex items-center justify-center sm:gap-4'>
                <RowsSelected table={table} />
                <RowsPerPage table={table} />
            </div>
            <div className='flex items-center justify-center'>
                <Pagination table={table} />
            </div>
        </div>
    );
}
