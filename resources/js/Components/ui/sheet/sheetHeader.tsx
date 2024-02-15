import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const sheetHeaderVariants = cva('flex flex-col space-y-2 text-center sm:text-left', {
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
