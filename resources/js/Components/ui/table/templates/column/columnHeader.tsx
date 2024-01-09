import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { Column } from '@tanstack/react-table';
import { Button } from '@/Components/ui/button/button';
import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon, EyeNoneIcon } from '@radix-ui/react-icons';
import {
    Dropdown,
    DropdownTrigger,
    DropdownContent,
    DropdownItem,
    DropdownSeparator,
} from '@/Components/ui/dropdown/dropdown';

interface ColumnHeaderProps<TData, TValue> extends HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
}

export function ColumnHeader<TData, TValue>({
    column,
    title,
    className,
}: ColumnHeaderProps<TData, TValue>) {
    const { t } = useTranslation();

    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>;
    }

    return (
        <div className={cn('flex items-center space-x-2', className)}>
            <Dropdown>
                <DropdownTrigger asChild>
                    <Button
                        variant='ghost'
                        size='sm'
                        className='-ml-3 h-8 data-[state=open]:bg-accent'
                    >
                        <span>{title}</span>
                        {column.getIsSorted() === 'desc' ? (
                            <ArrowDownIcon className='ml-2 h-4 w-4' />
                        ) : column.getIsSorted() === 'asc' ? (
                            <ArrowUpIcon className='ml-2 h-4 w-4' />
                        ) : (
                            <CaretSortIcon className='ml-2 h-4 w-4' />
                        )}
                    </Button>
                </DropdownTrigger>
                <DropdownContent align='start'>
                    <DropdownItem onClick={() => column.toggleSorting(false)}>
                        <ArrowUpIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
                        {t('Asc')}
                    </DropdownItem>
                    <DropdownItem onClick={() => column.toggleSorting(true)}>
                        <ArrowDownIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
                        {t('Desc')}
                    </DropdownItem>
                    <DropdownSeparator />
                    <DropdownItem onClick={() => column.toggleVisibility(false)}>
                        <EyeNoneIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
                        {t('Hide')}
                    </DropdownItem>
                </DropdownContent>
            </Dropdown>
        </div>
    );
}
