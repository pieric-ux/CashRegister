import { cn } from '@/lib/utils';
import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const cardTitleVariants = cva('', {
    variants: {
        variant: {
            default: 'text-lg font-medium',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface CardTitleProps
    extends HTMLAttributes<HTMLHeadingElement>,
        VariantProps<typeof cardTitleVariants> {}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
    ({ className, variant, ...props }, ref) => (
        <h2 className={cn(cardTitleVariants({ variant, className }))} ref={ref} {...props} />
    ),
);
CardTitle.displayName = 'CardTitle';

export { CardTitle };
