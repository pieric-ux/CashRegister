import { useTranslation } from 'react-i18next';
import { type TablePaginationProps } from './paginationComplex';
import { Button } from '@/Components/ui/button/button';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from '@radix-ui/react-icons';

export default function Pagination<TData>({ table }: TablePaginationProps<TData>): JSX.Element {
    const { t } = useTranslation();
    return (
        <>
            <div className='flex items-center space-x-2'>
                <Button
                    variant='outline'
                    className='h-8 w-8 p-0'
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
                <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
                    {t('Page')} {table.getState().pagination.pageIndex + 1} {t('of')}{' '}
                    {table.getPageCount()}
                </div>
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
                    className='h-8 w-8 p-0'
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    <span className='sr-only'>{t('Go to last page')}</span>
                    <DoubleArrowRightIcon className='h-4 w-4' />
                </Button>
            </div>
        </>
    );
}
