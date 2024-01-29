import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const dialogHeaderVariants = cva('text-center', {
    variants: {
        variant: {
            default: 'flex flex-col space-y-1.5 sm:text-left',
            'flex-row': 'flex flex-row',
            'flex-col': 'flex flex-col',
            grid: 'grid',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface DialogHeaderProps
    extends HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof dialogHeaderVariants> {}

const DialogHeader = ({ className, variant, ...props }: DialogHeaderProps): JSX.Element => (
    <div className={cn(dialogHeaderVariants({ variant, className }))} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

export { DialogHeader, dialogHeaderVariants };
