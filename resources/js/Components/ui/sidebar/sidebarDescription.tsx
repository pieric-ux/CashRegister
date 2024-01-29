import { cn } from '@/lib/utils';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
    Description,
    type DialogDescriptionProps as RadixDialogDescriptionProps,
} from '@radix-ui/react-dialog';

const sidebarDescriptionVariants = cva('', {
    variants: {
        variant: {
            default: 'text-sm text-muted-foreground',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface SidebarDescriptionProps
    extends ComponentPropsWithoutRef<typeof Description>,
        VariantProps<typeof sidebarDescriptionVariants>,
        RadixDialogDescriptionProps {}

const SidebarDescription = forwardRef<HTMLParagraphElement, SidebarDescriptionProps>(
    ({ className, variant, ...props }, ref) => (
        <Description
            className={cn(sidebarDescriptionVariants({ variant, className }))}
            ref={ref}
            {...props}
        />
    ),
);
SidebarDescription.displayName = Description.displayName;

export { SidebarDescription, sidebarDescriptionVariants };
