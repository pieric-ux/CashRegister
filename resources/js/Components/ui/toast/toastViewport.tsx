import { cn } from '@/lib/utils';
import { Viewport } from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

const toastViewportVariants = cva(
    'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
    {
        variants: {
            variant: {
                default: '',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

interface ToastViewportProps
    extends ComponentPropsWithoutRef<typeof Viewport>,
        VariantProps<typeof toastViewportVariants> {}

const ToastViewport = forwardRef<ElementRef<typeof Viewport>, ToastViewportProps>(
    ({ className, variant, ...props }, ref) => (
        <Viewport
            ref={ref}
            className={cn(toastViewportVariants({ variant, className }))}
            {...props}
        />
    ),
);
ToastViewport.displayName = Viewport.displayName;

export { ToastViewport };
