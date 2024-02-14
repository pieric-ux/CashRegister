import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const sidebarVariants = cva('mt-auto flex flex-col gap-2 p-4', {
    variants: {
        variant: {
            default: '',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface SidebarFooterProps
    extends HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof sidebarVariants> {}

const SidebarFooter = ({ className, variant, ...props }: SidebarFooterProps): JSX.Element => (
    <div className={cn(sidebarVariants({ variant, className }))} {...props} />
);
SidebarFooter.displayName = 'SidebarFooter';

export { SidebarFooter };
