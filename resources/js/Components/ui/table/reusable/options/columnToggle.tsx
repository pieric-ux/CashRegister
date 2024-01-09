import { type TableOptionsProps } from './viewOptions';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Button } from '../../../button/button';
import { useTranslation } from 'react-i18next';
import {
    Dropdown,
    DropdownCheckboxItem,
    DropdownContent,
    DropdownTrigger,
} from '../../../dropdown/dropdown';

export function ColumnToggle<TData>({ table }: TableOptionsProps<TData>) {
    const { t } = useTranslation();

    return (
        <Dropdown>
            <DropdownTrigger asChild>
                <Button variant={'outline'} className='ml-auto'>
                    {t('Columns')}
                    <ChevronDownIcon className='-mr-0.5 ml-1 h-4 w-4' />
                </Button>
            </DropdownTrigger>
            <DropdownContent align='end'>
                {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
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
