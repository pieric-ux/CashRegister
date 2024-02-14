import { cn } from '@/lib/utils';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
    Description,
    type DialogDescriptionProps as RadixDialogDescriptionProps,
} from '@radix-ui/react-dialog';

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
        VariantProps<typeof dialogDescriptionVariants>,
        RadixDialogDescriptionProps {}

const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
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
