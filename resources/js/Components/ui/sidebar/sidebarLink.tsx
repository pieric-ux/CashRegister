import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Link as InertiaLink, type InertiaLinkProps } from '@inertiajs/react';

const sidebarLinkVariants = cva(
    'flex items-center rounded-lg p-2 text-foreground transition duration-150 ease-in-out hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    {
        variants: {
            variant: {
                default: '',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

export interface SidebarLinkProps
    extends InertiaLinkProps,
        VariantProps<typeof sidebarLinkVariants> {
    svg?: ReactNode;
    active?: boolean;
}

const SidebarLink = ({
    className,
    variant,
    active = false,
    svg,
    children,
    ...props
}: SidebarLinkProps): JSX.Element => (
    <InertiaLink
        className={cn(
            sidebarLinkVariants({ variant, className }),
            active && 'border-2 border-ring',
        )}
        {...props}
    >
        {svg}
        <span className='ml-3'>{children}</span>
    </InertiaLink>
);
SidebarLink.displayName = 'SidebarLink';

export { SidebarLink };
