import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const sheetFooterVariants = cva('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', {
    variants: {
        variant: {
            default: '',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface SheetFooterProps
    extends HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof sheetFooterVariants> {}

const SheetFooter = ({ className, variant, ...props }: SheetFooterProps): JSX.Element => (
    <div className={cn(sheetFooterVariants({ variant, className }))} {...props} />
);
SheetFooter.displayName = 'SheetFooter';

export { SheetFooter };
