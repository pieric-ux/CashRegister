import { type Table } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select/select';

export interface TablePaginationProps<TData> {
    table: Table<TData>;
}

export function PaginationComplex<TData>({ table }: TablePaginationProps<TData>): JSX.Element {
    const { t } = useTranslation();

    return (
        <div className='flex items-center justify-between px-2'>
            <div className='flex-1 text-sm text-muted-foreground'>
                {table.getFilteredSelectedRowModel().rows.length} {t('of')}{' '}
                {table.getFilteredRowModel().rows.length} {t('row(s) selected')}
            </div>
            <div className='flex items-center space-x-6 lg:space-x-8'>
                <div className='flex items-center space-x-2'>
                    <p className='text-sm font-medium'>{t('Rows per page')}</p>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value));
                        }}
                    >
                        <SelectTrigger className='h-8 w-[70px]'>
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side='top'>
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
                    {t('Page')} {table.getState().pagination.pageIndex + 1} {t('of')}{' '}
                    {table.getPageCount()}
                </div>
                <div className='flex items-center space-x-2'>
                    <Button
                        variant='outline'
                        className='hidden h-8 w-8 p-0 lg:flex'
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className='sr-only'>{t('Go to first page')}</span>
                        <DoubleArrowLeftIcon className='h-4 w-4' />
                    </Button>
                    <Button
                        variant='outline'
                        className='h-8 w-8 p-0'
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className='sr-only'>{t('Go to previous page')}</span>
                        <ChevronLeftIcon className='h-4 w-4' />
                    </Button>
                    <Button
                        variant='outline'
                        className='h-8 w-8 p-0'
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className='sr-only'>{t('Go to next page')}</span>
                        <ChevronRightIcon className='h-4 w-4' />
                    </Button>
                    <Button
                        variant='outline'
                        className='hidden h-8 w-8 p-0 lg:flex'
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className='sr-only'>{t('Go to last page')}</span>
                        <DoubleArrowRightIcon className='h-4 w-4' />
                    </Button>
                </div>
            </div>
        </div>
    );
}