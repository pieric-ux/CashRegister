import { cn } from '@/lib/utils';
import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const cardDescriptionVariants = cva('', {
    variants: {
        variant: {
            default: 'text-sm text-muted-foreground',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface cardDescriptionProps
    extends HTMLAttributes<HTMLParagraphElement>,
        VariantProps<typeof cardDescriptionVariants> {}

const CardDescription = forwardRef<HTMLParagraphElement, cardDescriptionProps>(
    ({ className, variant, ...props }, ref) => (
        <p className={cn(cardDescriptionVariants({ variant, className }))} ref={ref} {...props} />
    ),
);
CardDescription.displayName = 'CardDescription';

export { CardDescription };
