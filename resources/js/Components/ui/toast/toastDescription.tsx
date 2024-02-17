import { cn } from '@/lib/utils';
import { Description } from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

const toastDescriptionVariants = cva('', {
    variants: {
        variant: {
            default: 'text-sm opacity-90',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

interface ToastDescriptionProps
    extends ComponentPropsWithoutRef<typeof Description>,
        VariantProps<typeof toastDescriptionVariants> {}

const ToastDescription = forwardRef<ElementRef<typeof Description>, ToastDescriptionProps>(
    ({ className, variant, ...props }, ref) => (
        <Description
            ref={ref}
            className={cn(toastDescriptionVariants({ variant, className }))}
            {...props}
        />
    ),
);
ToastDescription.displayName = Description.displayName;

export { ToastDescription };
