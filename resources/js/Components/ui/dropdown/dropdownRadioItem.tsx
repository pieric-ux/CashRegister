import { cn } from '@/lib/utils';
import { DotFilledIcon } from '@radix-ui/react-icons';
import { forwardRef, ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
    RadioItem,
    ItemIndicator,
    type DropdownMenuRadioItemProps as RadixDropdownMenuRadioItemProps,
} from '@radix-ui/react-dropdown-menu';

const dropdownRadioItemVariants = cva(
    'relative flex cursor-default select-none transition data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
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

export interface DropdownRadioItemProps
    extends ComponentPropsWithoutRef<typeof RadioItem>,
        VariantProps<typeof dropdownRadioItemVariants>,
        RadixDropdownMenuRadioItemProps {}

const DropdownRadioItem = forwardRef<HTMLDivElement, DropdownRadioItemProps>(
    ({ className, variant, size, children, ...props }, ref) => (
        <RadioItem
            className={cn(dropdownRadioItemVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        >
            <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
                <ItemIndicator>
                    <DotFilledIcon className='h-4 w-4 fill-current' />
                </ItemIndicator>
            </span>
            {children}
        </RadioItem>
    ),
);
DropdownRadioItem.displayName = RadioItem.displayName;

export { DropdownRadioItem, dropdownRadioItemVariants };
