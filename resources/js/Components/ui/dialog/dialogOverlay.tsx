import { cn } from '@/lib/utils';
import { Overlay } from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

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
        VariantProps<typeof dialogOverlayVariants> {}

const DialogOverlay = forwardRef<ElementRef<typeof Overlay>, DialogOverlayProps>(
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
