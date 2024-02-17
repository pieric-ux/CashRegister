import { cn } from '@/lib/utils';
import { Close } from '@radix-ui/react-toast';
import { Cross2Icon } from '@radix-ui/react-icons';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

const toastCloseVariants = cva('', {
    variants: {
        variant: {
            default:
                'absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

interface ToastCloseProps
    extends ComponentPropsWithoutRef<typeof Close>,
        VariantProps<typeof toastCloseVariants> {}

const ToastClose = forwardRef<ElementRef<typeof Close>, ToastCloseProps>(
    ({ className, variant, ...props }, ref) => (
        <Close
            ref={ref}
            className={cn(toastCloseVariants({ variant, className }))}
            toast-close=''
            {...props}
        >
            <Cross2Icon className='h-4 w-4' />
        </Close>
    ),
);
ToastClose.displayName = Close.displayName;

export { ToastClose };
