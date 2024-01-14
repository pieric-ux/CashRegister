import { cn } from '@/lib/utils';
import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const alertTitleVariants = cva('', {
    variants: {
        variant: {
            default: 'mb-1 leading-none tracking-tight',
        },
        size: {
            default: 'font-medium',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});

export interface AlertTitleProps
    extends HTMLAttributes<HTMLHeadingElement>,
        VariantProps<typeof alertTitleVariants> {}

const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(
    ({ className, variant, size, ...props }, ref) => (
        <h4 ref={ref} className={cn(alertTitleVariants({ variant, size, className }))} {...props} />
    ),
);
AlertTitle.displayName = 'AlertTitle';

export { AlertTitle, alertTitleVariants };
