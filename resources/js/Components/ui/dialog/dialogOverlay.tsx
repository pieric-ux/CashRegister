import { forwardRef, ComponentPropsWithoutRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { Overlay, DialogOverlayProps as RadixDialogOverlayProps } from '@radix-ui/react-dialog';

import { cn } from '@/lib/utils';

const dialogOverlayVariants = cva(
    'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
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
