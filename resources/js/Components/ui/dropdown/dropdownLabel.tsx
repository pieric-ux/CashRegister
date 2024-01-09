import { cn } from '@/lib/utils';
import { forwardRef, ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
    Label,
    type DropdownMenuLabelProps as RadixDropdownMenuLabelProps,
} from '@radix-ui/react-dropdown-menu';

const dropdownLabelVariants = cva('', {
    variants: {
        variant: {
            default: 'px-2 py-1.5 text-sm font-semibold',
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

export interface DropdownLabelProps
    extends ComponentPropsWithoutRef<typeof Label>,
        VariantProps<typeof dropdownLabelVariants>,
        RadixDropdownMenuLabelProps {
    inset?: boolean;
}

const DropdownLabel = forwardRef<HTMLDivElement, DropdownLabelProps>(
    ({ className, variant, size, inset, ...props }, ref) => (
        <Label
            ref={ref}
            className={cn(dropdownLabelVariants({ variant, size, className }), inset && 'pl-8')}
            {...props}
        />
    ),
);
DropdownLabel.displayName = Label.displayName;

export { DropdownLabel, dropdownLabelVariants };
