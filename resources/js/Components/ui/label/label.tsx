'use client';

import { cn } from '@/lib/utils';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { Root } from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';

const labelVariants = cva('peer-disabled:cursor-not-allowed peer-disabled:opacity-70', {
    variants: {
        variant: {
            default: 'text-sm font-medium leading-none ',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface LabelProps
    extends ComponentPropsWithoutRef<typeof Root>,
        VariantProps<typeof labelVariants> {}

const Label = forwardRef<HTMLLabelElement, LabelProps>(({ className, variant, ...props }, ref) => (
    <Root ref={ref} className={cn(labelVariants({ variant, className }))} {...props} />
));
Label.displayName = Root.displayName;

export { Label };
