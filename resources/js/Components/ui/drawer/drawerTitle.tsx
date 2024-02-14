import { cn } from '@/lib/utils';
import { Drawer as DrawerPrimitive } from 'vaul';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

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

const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>(
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
