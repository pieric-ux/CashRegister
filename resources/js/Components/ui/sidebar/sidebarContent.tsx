import { cn } from '@/lib/utils';
import { SidebarOverlay } from './sidebarOverlay';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import {
    Content,
    Portal,
    type DialogContentProps as RadixDialogContentProps,
} from '@radix-ui/react-dialog';

const sidebarContentVariants = cva(
    'fixed z-50 transition duration-300 ease-linear focus:outline-none',
    {
        variants: {
            variant: {
                default: 'hidden h-full w-72 flex-col bg-sidebar sm:flex',
            },
            direction: {
                right: 'inset-y-0 right-0',
                left: 'inset-y-0 left-0',
            },
        },
        defaultVariants: {
            variant: 'default',
            direction: 'left',
        },
    },
);

export interface SidebarContentProps
    extends ComponentPropsWithoutRef<typeof Content>,
        VariantProps<typeof sidebarContentVariants>,
        RadixDialogContentProps {
    children?: ReactNode;
}

const SidebarContent = forwardRef<HTMLDivElement, SidebarContentProps>(
    ({ className, variant, direction, children, ...props }, ref) => (
        <Portal>
            <SidebarOverlay />
            <Content
                className={cn(sidebarContentVariants({ variant, direction, className }))}
                ref={ref}
                {...props}
            >
                {children}
            </Content>
        </Portal>
    ),
);
SidebarContent.displayName = Content.displayName;

export { SidebarContent };
