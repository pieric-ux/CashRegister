import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
    Description,
    DialogDescriptionProps as RadixDialogDescriptionProps,
} from '@radix-ui/react-dialog';

import { cn } from '@/lib/utils';

const dialogDescriptionVariants = cva('', {
    variants: {
        variant: {
            default: 'text-sm text-muted-foreground',
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

export interface DialogDescriptionProps
    extends ComponentPropsWithoutRef<typeof Description>,
        VariantProps<typeof dialogDescriptionVariants>,
        RadixDialogDescriptionProps {}

const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
    ({ className, variant, size, ...props }, ref) => (
        <Description
            className={cn(dialogDescriptionVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    ),
);
DialogDescription.displayName = Description.displayName;

export { DialogDescription, dialogDescriptionVariants };
