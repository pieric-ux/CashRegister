import { cn } from '@/lib/utils';
import { Drawer as DrawerPrimitive } from 'vaul';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

const drawerTitleVariants = cva('', {
    variants: {
        variant: {
            default: 'text-lg font-semibold leading-none tracking-tight',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface DrawerTitleProps
    extends ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>,
        VariantProps<typeof drawerTitleVariants> {}

const DrawerTitle = forwardRef<ElementRef<typeof DrawerPrimitive.Title>, DrawerTitleProps>(
    ({ className, variant, ...props }, ref) => (
        <DrawerPrimitive.Title
            ref={ref}
            className={cn(drawerTitleVariants({ variant, className }))}
            {...props}
        />
    ),
);
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

export { DrawerTitle };
