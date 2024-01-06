import { HTMLAttributes } from 'react';
import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

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

const DialogHeader = ({ className, variant, ...props }: DialogHeaderProps) => (
    <div className={cn(dialogHeaderVariants({ variant, className }))} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

export { DialogHeader, dialogHeaderVariants };
