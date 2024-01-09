import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const dialogFooterVariants = cva('', {
    variants: {
        variant: {
            default: 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
            'flex-row': 'flex flex-row',
            'flex-col': 'flex flex-col',
            grid: 'grid',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface DialogFooterProps
    extends HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof dialogFooterVariants> {}

const DialogFooter = ({ className, variant, ...props }: DialogFooterProps) => (
    <div className={cn(dialogFooterVariants({ variant, className }))} {...props} />
);
DialogFooter.displayName = 'DialogFooter';

export { DialogFooter, dialogFooterVariants };
