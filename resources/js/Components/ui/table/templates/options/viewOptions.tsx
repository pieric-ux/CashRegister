'use client';

import { type Table } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import {
    Dropdown,
    DropdownCheckboxItem,
    DropdownContent,
    DropdownLabel,
    DropdownSeparator,
    DropdownTrigger,
} from '@/Components/ui/dropdown/dropdown';

export interface TableOptionsProps<TData> {
    table: Table<TData>;
}

export function ViewOptions<TData>({ table }: TableOptionsProps<TData>): JSX.Element {
    const { t } = useTranslation();
    return (
        <Dropdown>
            <DropdownTrigger asChild>
                <Button variant='outline' size='sm' className='flex h-8'>
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
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                            >
                                {t(column.id)}
                            </DropdownCheckboxItem>
                        );
                    })}
            </DropdownContent>
        </Dropdown>
    );
}
