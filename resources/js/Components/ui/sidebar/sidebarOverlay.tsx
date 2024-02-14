import { cn } from '@/lib/utils';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
    Overlay,
    type DialogOverlayProps as RadixDialogOverlayProps,
} from '@radix-ui/react-dialog';

const sidebarOverlayVariants = cva('fixed inset-0 z-50', {
    variants: {
        variant: {
            default: 'bg-black/80',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface SidebarOverlayProps
    extends ComponentPropsWithoutRef<typeof Overlay>,
        VariantProps<typeof sidebarOverlayVariants>,
        RadixDialogOverlayProps {}

const SidebarOverlay = forwardRef<HTMLDivElement, SidebarOverlayProps>(
    ({ className, variant, ...props }, ref) => (
        <Overlay
            className={cn(sidebarOverlayVariants({ variant, className }))}
            ref={ref}
            {...props}
        />
    ),
);
SidebarOverlay.displayName = Overlay.displayName;

export { SidebarOverlay };
