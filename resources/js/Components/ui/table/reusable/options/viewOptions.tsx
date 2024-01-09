'use client';

import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { Button } from '../../../button/button';
import { useTranslation } from 'react-i18next';
import {
    Dropdown,
    DropdownCheckboxItem,
    DropdownContent,
    DropdownLabel,
    DropdownSeparator,
    DropdownTrigger,
} from '../../../dropdown/dropdown';

export interface TableOptionsProps<TData> {
    table: Table<TData>;
}

export function ViewOptions<TData>({ table }: TableOptionsProps<TData>) {
    const { t } = useTranslation();
    return (
        <Dropdown>
            <DropdownTrigger asChild>
                <Button variant='outline' size='sm' className='ml-auto hidden h-8 lg:flex'>
                    <MixerHorizontalIcon className='mr-2 h-4 w-4' />
                    {t('View')}
                </Button>
            </DropdownTrigger>
            <DropdownContent align='end' className='w-[150px]'>
                <DropdownLabel>{t('Toggle columns')}</DropdownLabel>
                <DropdownSeparator />
                {table
                    .getAllColumns()
                    .filter(
                        (column) => typeof column.accessorFn !== 'undefined' && column.getCanHide(),
                    )
                    .map((column) => {
                        return (
                            <DropdownCheckboxItem
                                key={column.id}
                                className='capitalize'
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                            >
                                {column.id}
                            </DropdownCheckboxItem>
                        );
                    })}
            </DropdownContent>
        </Dropdown>
    );
}
