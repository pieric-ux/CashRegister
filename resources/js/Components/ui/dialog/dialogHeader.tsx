import { HTMLAttributes } from 'react';
import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const dialogHeaderVariants = cva('flex flex-col space-y-1.5 text-center sm:text-left', {
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

export interface DialogHeaderProps
    extends HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof dialogHeaderVariants> {}

const DialogHeader = ({ className, variant, size, ...props }: DialogHeaderProps) => (
    <div className={cn(dialogHeaderVariants({ variant, size, className }))} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

export { DialogHeader, dialogHeaderVariants };
