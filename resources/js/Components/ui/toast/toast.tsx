import { cn } from '@/lib/utils';
import { ToastTitle } from './toastTitle';
import { ToastClose } from './toastClose';
import { ToastAction } from './toastAction';
import { Root, Provider } from '@radix-ui/react-toast';
import { ToastViewport } from './toastViewport';
import { ToastDescription } from './toastDescription';
import { cva, type VariantProps } from 'class-variance-authority';
import {
    forwardRef,
    type ElementRef,
    type ReactElement,
    type ComponentPropsWithoutRef,
} from 'react';

const toastVariants = cva(
    'group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
    {
        variants: {
            variant: {
                default: 'border bg-foreground text-background',
                destructive:
                    'destructive group border-destructive bg-destructive text-destructive-foreground',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

const Toast = forwardRef<
    ElementRef<typeof Root>,
    ComponentPropsWithoutRef<typeof Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
    return <Root ref={ref} className={cn(toastVariants({ variant, className }))} {...props} />;
});
Toast.displayName = Root.displayName;

const ToastProvider = Provider;

type ToastProps = ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = ReactElement<typeof ToastAction>;

export {
    type ToastProps,
    type ToastActionElement,
    ToastProvider,
    ToastViewport,
    Toast,
    ToastTitle,
    ToastDescription,
    ToastClose,
    ToastAction,
};
