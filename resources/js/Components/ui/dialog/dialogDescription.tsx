import { cn } from '@/lib/utils';
import { Description } from '@radix-ui/react-dialog';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const dialogDescriptionVariants = cva('', {
    variants: {
        variant: {
            default: 'text-sm text-muted-foreground',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface DialogDescriptionProps
    extends ComponentPropsWithoutRef<typeof Description>,
        VariantProps<typeof dialogDescriptionVariants> {}

const DialogDescription = forwardRef<ElementRef<typeof Description>, DialogDescriptionProps>(
    ({ className, variant, ...props }, ref) => (
        <Description
            className={cn(dialogDescriptionVariants({ variant, className }))}
            ref={ref}
            {...props}
        />
    ),
);
DialogDescription.displayName = Description.displayName;

export { DialogDescription };
