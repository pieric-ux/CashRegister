import { cn } from '@/lib/utils';
import { Drawer as DrawerPrimitive } from 'vaul';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

const drawerOverlayVariants = cva('fixed inset-0 z-50', {
    variants: {
        variant: {
            default: 'bg-black/80',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface DrawerOverlayProps
    extends ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>,
        VariantProps<typeof drawerOverlayVariants> {}

const DrawerOverlay = forwardRef<ElementRef<typeof DrawerPrimitive.Overlay>, DrawerOverlayProps>(
    ({ className, variant, ...props }, ref) => (
        <DrawerPrimitive.Overlay
            className={cn(drawerOverlayVariants({ variant, className }))}
            ref={ref}
            {...props}
        />
    ),
);
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

export { DrawerOverlay };
