import { cn } from '@/lib/utils';
import { forwardRef, type HTMLAttributes } from 'react';
import { AlertTitle } from '@/Components/ui/alert/alertTitle';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertDescription } from '@/Components/ui/alert/alertDescription';

const alertVariants = cva(
    'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
    {
        variants: {
            variant: {
                default: 'bg-background text-foreground',
                destructive:
                    'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
                success:
                    'border-success bg-success/10 dark:border-success [&>svg]:text-success-foreground text-success-foreground',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

export interface AlertProps
    extends HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof alertVariants> {}

const Alert = forwardRef<HTMLDivElement, AlertProps>(({ className, variant, ...props }, ref) => (
    <div ref={ref} role='alert' className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = 'Alert';

export { Alert, AlertTitle, AlertDescription, alertVariants };
