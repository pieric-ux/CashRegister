import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
import { type TablePaginationProps } from '@/Components/ui/table/templates/pagination/paginationComplex';

export function PaginationSimple<TData>({ table }: TablePaginationProps<TData>): JSX.Element {
    const { t } = useTranslation();

    return (
        <div className='mt-4 flex items-center justify-between px-4'>
            <Button
                variant='outline'
                size='sm'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                {t('Previous')}
            </Button>
            <Button
                variant='outline'
                size='sm'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                {t('Next')}
            </Button>
        </div>
    );
}
