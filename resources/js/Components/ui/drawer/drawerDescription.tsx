import { cn } from '@/lib/utils';
import { Drawer as DrawerPrimitive } from 'vaul';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

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

const DrawerDescription = forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
    ({ className, variant, ...props }, ref) => (
        <DrawerPrimitive.Description
            ref={ref}
            className={cn(drawerDescriptionVariants({ variant, className }))}
            {...props}
        />
    ),
);
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export { DrawerDescription };
