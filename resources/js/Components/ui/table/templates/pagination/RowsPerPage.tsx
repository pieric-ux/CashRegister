import { useTranslation } from 'react-i18next';
import { type TablePaginationProps } from './paginationComplex';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select/select';

export default function RowsPerPage<TData>({ table }: TablePaginationProps<TData>): JSX.Element {
    const { t } = useTranslation();
    return (
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
    );
}
