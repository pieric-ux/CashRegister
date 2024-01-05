import { HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const cardContentVariants = cva('p-6 pt-0', {
    variants: {
        variant: {
            default: '',
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

export interface CardContentProps
    extends HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof cardContentVariants> {}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
    ({ className, variant, size, ...props }, ref) => (
        <div
            className={cn(cardContentVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    ),
);
CardContent.displayName = 'CardContent';

export { CardContent, cardContentVariants };
