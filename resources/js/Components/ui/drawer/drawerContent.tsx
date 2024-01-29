import { cn } from '@/lib/utils';
import { Drawer as DrawerPrimitive } from 'vaul';
import { DrawerPortal } from '@/Components/ui/drawer/drawer';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { DrawerOverlay } from '@/Components/ui/drawer/drawerOverlay';

const drawerContentVariants = cva('z-50 focus:outline-none', {
    variants: {
        variant: {
            default:
                'fixed inset-x-0 bottom-0 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface DrawerContentProps
    extends ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>,
        VariantProps<typeof drawerContentVariants> {}

const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
    ({ className, variant, children, ...props }, ref) => (
        <DrawerPortal>
            <DrawerOverlay variant={variant} />
            <DrawerPrimitive.Content
                ref={ref}
                className={cn(drawerContentVariants({ variant, className }))}
                {...props}
            >
                <div className='mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted' />

                {children}
            </DrawerPrimitive.Content>
        </DrawerPortal>
    ),
);
DrawerContent.displayName = 'DrawerContent';

export { DrawerContent, drawerContentVariants };
