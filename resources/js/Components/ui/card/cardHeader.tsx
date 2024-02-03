import { cn } from '@/lib/utils';
import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const cardHeaderVariants = cva('p-6', {
    variants: {
        variant: {
            default: 'flex flex-col space-y-1.5 ',
            'flex-row': 'flex flex-row',
            'flex-col': 'flex flex-col',
            grid: 'grid',
        },
        size: {
            default: '',
            xl: 'mx-auto max-w-xl',
            '2xl': 'mx-auto max-w-2xl',
            '3xl': 'mx-auto max-w-3xl',
            '4xl': 'mx-auto max-w-4xl',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});

export interface CardHeaderProps
    extends HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof cardHeaderVariants> {}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ className, variant, size, ...props }, ref) => (
        <div
            className={cn(cardHeaderVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    ),
);
CardHeader.displayName = 'CardHeader';

export { CardHeader, cardHeaderVariants };
