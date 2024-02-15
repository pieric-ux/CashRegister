import { cn } from '@/lib/utils';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

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
        VariantProps<typeof dropdownSeparatorVariants> {}

const DropdownSeparator = forwardRef<ElementRef<typeof Separator>, DropdownSeparatorProps>(
    ({ className, variant, size, ...props }, ref) => (
        <Separator
            className={cn(dropdownSeparatorVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    ),
);
DropdownSeparator.displayName = Separator.displayName;

export { DropdownSeparator };
