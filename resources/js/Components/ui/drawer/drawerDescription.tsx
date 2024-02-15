import { cn } from '@/lib/utils';
import { Drawer as DrawerPrimitive } from 'vaul';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

const drawerDescriptionVariants = cva('', {
    variants: {
        variant: {
            default: 'text-sm text-muted-foreground',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface DrawerDescriptionProps
    extends ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>,
        VariantProps<typeof drawerDescriptionVariants> {}

const DrawerDescription = forwardRef<
    ElementRef<typeof DrawerPrimitive.Description>,
    DrawerDescriptionProps
>(({ className, variant, ...props }, ref) => (
    <DrawerPrimitive.Description
        ref={ref}
        className={cn(drawerDescriptionVariants({ variant, className }))}
        {...props}
    />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export { DrawerDescription };
