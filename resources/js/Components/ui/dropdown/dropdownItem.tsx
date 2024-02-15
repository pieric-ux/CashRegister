import { cn } from '@/lib/utils';
import { Item } from '@radix-ui/react-dropdown-menu';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

const dropdownItemVariants = cva(
    'relative flex cursor-default select-none transition ease-linear data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    {
        variants: {
            variant: {
                default: 'items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent',
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

export interface DropdownItemProps
    extends ComponentPropsWithoutRef<typeof Item>,
        VariantProps<typeof dropdownItemVariants> {
    inset?: boolean;
}

const DropdownItem = forwardRef<ElementRef<typeof Item>, DropdownItemProps>(
    ({ className, variant, size, inset = false, ...props }, ref) => (
        <Item
            ref={ref}
            className={cn(dropdownItemVariants({ variant, size, className }), inset && 'pl-8')}
            {...props}
        />
    ),
);
DropdownItem.displayName = Item.displayName;

export { DropdownItem };
