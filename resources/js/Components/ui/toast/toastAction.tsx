import { cn } from '@/lib/utils';
import { Action } from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

const toastActionVariants = cva('', {
    variants: {
        variant: {
            default:
                'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

interface ToastActionProps
    extends ComponentPropsWithoutRef<typeof Action>,
        VariantProps<typeof toastActionVariants> {}

const ToastAction = forwardRef<ElementRef<typeof Action>, ToastActionProps>(
    ({ className, variant, ...props }, ref) => (
        <Action ref={ref} className={cn(toastActionVariants({ variant, className }))} {...props} />
    ),
);
ToastAction.displayName = Action.displayName;

export { ToastAction };
