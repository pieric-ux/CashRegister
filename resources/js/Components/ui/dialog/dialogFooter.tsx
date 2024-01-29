import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const dialogFooterVariants = cva('', {
    variants: {
        variant: {
            default: 'flex flex-col-reverse justify-end gap-3 sm:flex-row',
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

const DialogFooter = ({ className, variant, ...props }: DialogFooterProps): JSX.Element => (
    <div className={cn(dialogFooterVariants({ variant, className }))} {...props} />
);
DialogFooter.displayName = 'DialogFooter';

export { DialogFooter, dialogFooterVariants };
