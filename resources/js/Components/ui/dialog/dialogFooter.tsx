import { HTMLAttributes } from 'react';
import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const dialogFooterVariants = cva('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', {
    variants: {
        variant: {
            default: '',
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

export interface DialogFooterProps
    extends HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof dialogFooterVariants> {}

const DialogFooter = ({ className, variant, size, ...props }: DialogFooterProps) => (
    <div className={cn(dialogFooterVariants({ variant, size, className }))} {...props} />
);
DialogFooter.displayName = 'DialogFooter';

export { DialogFooter, dialogFooterVariants };
