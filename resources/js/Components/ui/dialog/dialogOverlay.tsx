import { cn } from '@/lib/utils';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
    Overlay,
    type DialogOverlayProps as RadixDialogOverlayProps,
} from '@radix-ui/react-dialog';

const dialogOverlayVariants = cva(
    'fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    {
        variants: {
            variant: {
                default: 'bg-black/80',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

export interface DialogOverlayProps
    extends ComponentPropsWithoutRef<typeof Overlay>,
        VariantProps<typeof dialogOverlayVariants>,
        RadixDialogOverlayProps {}

const DialogOverlay = forwardRef<HTMLDivElement, DialogOverlayProps>(
    ({ className, variant, ...props }, ref) => (
        <Overlay
            className={cn(dialogOverlayVariants({ variant, className }))}
            ref={ref}
            {...props}
        />
    ),
);
DialogOverlay.displayName = Overlay.displayName;

export { DialogOverlay };
