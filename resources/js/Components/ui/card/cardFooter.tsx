import { cn } from '@/lib/utils';
import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const cardFooterVariants = cva('p-6 pt-0', {
    variants: {
        variant: {
            default: 'flex items-center',
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

export interface cardFooterProps
    extends HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof cardFooterVariants> {}

const CardFooter = forwardRef<HTMLDivElement, cardFooterProps>(
    ({ className, variant, size, ...props }, ref) => (
        <div
            className={cn(cardFooterVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    ),
);
CardFooter.displayName = 'CardFooter';

export { CardFooter, cardFooterVariants };
