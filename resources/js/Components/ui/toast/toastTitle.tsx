import { cn } from '@/lib/utils';
import { Title } from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

const toastTitleVariants = cva('', {
    variants: {
        variant: {
            default: 'text-sm font-semibold [&+div]:text-xs',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

interface ToastTitleProps
    extends ComponentPropsWithoutRef<typeof Title>,
        VariantProps<typeof toastTitleVariants> {}

const ToastTitle = forwardRef<ElementRef<typeof Title>, ToastTitleProps>(
    ({ className, variant, ...props }, ref) => (
        <Title ref={ref} className={cn(toastTitleVariants({ variant, className }))} {...props} />
    ),
);
ToastTitle.displayName = Title.displayName;

export { ToastTitle };
