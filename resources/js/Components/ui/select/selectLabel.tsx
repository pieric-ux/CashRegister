import { forwardRef, ComponentPropsWithoutRef } from 'react';
import { Label, type SelectLabelProps as RadixSelectLabelProps } from '@radix-ui/react-select';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

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
        VariantProps<typeof selectLabelVariants>,
        RadixSelectLabelProps {}

const SelectLabel = forwardRef<HTMLDivElement, SelectLabelProps>(
    ({ className, variant, size, ...props }, ref) => (
        <Label
            className={cn(selectLabelVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    ),
);
SelectLabel.displayName = Label.displayName;

export { SelectLabel, selectLabelVariants };
