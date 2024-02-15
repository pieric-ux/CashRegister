import { cn } from '@/lib/utils';
import { Description } from '@radix-ui/react-dialog';
import { VariantProps, cva } from 'class-variance-authority';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

const sheetDescriptionVariants = cva('', {
    variants: {
        variant: {
            default: 'text-sm text-muted-foreground',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface SheetDescriptionProps
    extends ComponentPropsWithoutRef<typeof Description>,
        VariantProps<typeof sheetDescriptionVariants> {}

const SheetDescription = forwardRef<ElementRef<typeof Description>, SheetDescriptionProps>(
    ({ className, variant, ...props }, ref) => (
        <Description
            ref={ref}
            className={cn(sheetDescriptionVariants({ variant, className }))}
            {...props}
        />
    ),
);
SheetDescription.displayName = Description.displayName;

export { SheetDescription };
