import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const sheetHeaderVariants = cva('grid gap-1.5 p-4 pt-0 text-center sm:text-left', {
    variants: {
        variant: {
            default: '',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});
export interface SheetHeaderProps
    extends HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof sheetHeaderVariants> {}

const SheetHeader = ({ className, variant, ...props }: SheetHeaderProps): JSX.Element => (
    <div className={cn(sheetHeaderVariants({ variant, className }))} {...props} />
);
SheetHeader.displayName = 'SheetHeader';

export { SheetHeader };
