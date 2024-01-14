import { cn } from '@/lib/utils';
import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const alertDescriptionVariants = cva('', {
    variants: {
        variant: {
            default: 'text-sm [&_p]:leading-relaxed',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface AlertDescriptionProps
    extends HTMLAttributes<HTMLParagraphElement>,
        VariantProps<typeof alertDescriptionVariants> {}

const AlertDescription = forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
    ({ className, variant, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(alertDescriptionVariants({ variant, className }))}
            {...props}
        />
    ),
);
AlertDescription.displayName = 'AlertDescription';

export { AlertDescription, alertDescriptionVariants };
