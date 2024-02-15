import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-dropdown-menu';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

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
        VariantProps<typeof dropdownLabelVariants> {
    inset?: boolean;
}

const DropdownLabel = forwardRef<ElementRef<typeof Label>, DropdownLabelProps>(
    ({ className, variant, size, inset = false, ...props }, ref) => (
        <Label
            ref={ref}
            className={cn(dropdownLabelVariants({ variant, size, className }), inset && 'pl-8')}
            {...props}
        />
    ),
);
DropdownLabel.displayName = Label.displayName;

export { DropdownLabel };
