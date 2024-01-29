import { useTranslation } from 'react-i18next';
import { type TablePaginationProps } from './paginationComplex';

export default function RowsSelected<TData>({ table }: TablePaginationProps<TData>): JSX.Element {
    const { t } = useTranslation();
    return (
        <div className='flex-1 text-sm text-muted-foreground'>
            {table.getFilteredSelectedRowModel().rows.length} {t('of')}{' '}
            {table.getFilteredRowModel().rows.length} {t('row(s) selected')}
        </div>
    );
}
