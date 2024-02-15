import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-select';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

const selectLabelVariants = cva('', {
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

export interface SelectLabelProps
    extends ComponentPropsWithoutRef<typeof Label>,
        VariantProps<typeof selectLabelVariants> {}

const SelectLabel = forwardRef<ElementRef<typeof Label>, SelectLabelProps>(
    ({ className, variant, size, ...props }, ref) => (
        <Label
            className={cn(selectLabelVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    ),
);
SelectLabel.displayName = Label.displayName;

export { SelectLabel };
