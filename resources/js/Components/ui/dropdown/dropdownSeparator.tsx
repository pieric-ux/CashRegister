import { cn } from '@/lib/utils';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
    Separator,
    type DropdownMenuSeparatorProps as RadixDropdownMenuSeparatorProps,
} from '@radix-ui/react-dropdown-menu';

const dropdownSeparatorVariants = cva('', {
    variants: {
        variant: {
            default: '-mx-1 my-1 h-px bg-muted',
        },
        size: {
            default: '',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});

export interface DropdownSeparatorProps
    extends ComponentPropsWithoutRef<typeof Separator>,
        VariantProps<typeof dropdownSeparatorVariants>,
        RadixDropdownMenuSeparatorProps {}

const DropdownSeparator = forwardRef<HTMLDivElement, DropdownSeparatorProps>(
    ({ className, variant, size, ...props }, ref) => (
        <Separator
            className={cn(dropdownSeparatorVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    ),
);
DropdownSeparator.displayName = Separator.displayName;

export { DropdownSeparator, dropdownSeparatorVariants };
