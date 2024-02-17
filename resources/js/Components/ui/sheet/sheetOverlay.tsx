import { cn } from '@/lib/utils';
import { Overlay } from '@radix-ui/react-dialog';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const sheetOverlayVariants = cva('fixed inset-0 z-50', {
    variants: {
        variant: {
            default: 'bg-black/80',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface SheetOverlayProps
    extends ComponentPropsWithoutRef<typeof Overlay>,
        VariantProps<typeof sheetOverlayVariants> {}

const SheetOverlay = forwardRef<ElementRef<typeof Overlay>, SheetOverlayProps>(
    ({ className, variant, ...props }, ref) => (
        <Overlay
            className={cn(sheetOverlayVariants({ variant, className }))}
            ref={ref}
            {...props}
        />
    ),
);
SheetOverlay.displayName = Overlay.displayName;

export { SheetOverlay };
