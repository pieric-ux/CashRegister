import { forwardRef, ComponentPropsWithoutRef } from 'react';
import { CheckIcon } from '@radix-ui/react-icons';
import { cva, type VariantProps } from 'class-variance-authority';
import {
    CheckboxItem,
    ItemIndicator,
    type DropdownMenuCheckboxItemProps as RadixDropdownMenuCheckboxItemProps,
} from '@radix-ui/react-dropdown-menu';

import { cn } from '@/lib/utils';

const dropdownCheckboxItemVariants = cva(
    'relative flex cursor-default select-none transition duration-300 ease-linear data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground',
            },
            size: {
                default: '',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface DropdownCheckboxItemProps
    extends ComponentPropsWithoutRef<typeof CheckboxItem>,
        VariantProps<typeof dropdownCheckboxItemVariants>,
        RadixDropdownMenuCheckboxItemProps {}

const DropdownCheckboxItem = forwardRef<HTMLDivElement, DropdownCheckboxItemProps>(
    ({ className, variant, size, children, checked, ...props }, ref) => (
        <CheckboxItem
            className={cn(dropdownCheckboxItemVariants({ variant, size, className }))}
            ref={ref}
            checked={checked}
            {...props}
        >
            <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
                <ItemIndicator>
                    <CheckIcon className='h-4 w-4' />
                </ItemIndicator>
            </span>
            {children}
        </CheckboxItem>
    ),
);
DropdownCheckboxItem.displayName = CheckboxItem.displayName;

export { DropdownCheckboxItem, dropdownCheckboxItemVariants };
