import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const sidebarHeaderVariants = cva('grid gap-1.5 p-4 text-center sm:text-left', {
    variants: {
        variant: {
            default: '',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface SidebarHeaderProps
    extends HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof sidebarHeaderVariants> {}

const SidebarHeader = ({ className, variant, ...props }: SidebarHeaderProps): JSX.Element => (
    <div className={cn(sidebarHeaderVariants({ variant, className }))} {...props} />
);
SidebarHeader.displayName = 'SidebarHeader';

export { SidebarHeader, sidebarHeaderVariants };
