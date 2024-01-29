import { cn } from '@/lib/utils';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Title, type DialogTitleProps as RadixDialogTitleProps } from '@radix-ui/react-dialog';

const sidebarTitleVariants = cva('', {
    variants: {
        variant: {
            default: 'text-lg font-semibold leading-none tracking-tight',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface SidebarTitleProps
    extends ComponentPropsWithoutRef<typeof Title>,
        VariantProps<typeof sidebarTitleVariants>,
        RadixDialogTitleProps {}

const SidebarTitle = forwardRef<HTMLHeadingElement, SidebarTitleProps>(
    ({ className, variant, ...props }, ref) => (
        <Title className={cn(sidebarTitleVariants({ variant, className }))} ref={ref} {...props} />
    ),
);
SidebarTitle.displayName = Title.displayName;

export { SidebarTitle, sidebarTitleVariants };
