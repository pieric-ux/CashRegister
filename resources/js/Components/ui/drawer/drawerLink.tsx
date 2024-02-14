import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Link as InertiaLink, type InertiaLinkProps } from '@inertiajs/react';

const drawerLinkVariants = cva(
    'flex w-full items-start border-l-4 py-2 pl-3 pr-4 text-base font-medium transition duration-150 ease-in-out focus:outline-none',
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

export interface DrawerLinkProps extends InertiaLinkProps, VariantProps<typeof drawerLinkVariants> {
    svg?: ReactNode;
    active?: boolean;
}

const DrawerLink = ({
    className,
    variant,
    active = false,
    svg,
    children,
    ...props
}: DrawerLinkProps): JSX.Element => (
    <InertiaLink
        className={cn(
            drawerLinkVariants({ variant, className }),
            active &&
                'border-ring bg-ring/10 text-ring-foreground focus:border-ring-foreground focus:bg-ring/30 dark:text-white dark:focus:border-ring dark:focus:bg-ring-foreground',
            !active &&
                'border-transparent text-foreground hover:border-foreground/60 hover:bg-foreground/10 focus:border-foreground/60 focus:bg-foreground/10 ',
        )}
        {...props}
    >
        {svg}
        <span className='ml-3'>{children}</span>
    </InertiaLink>
);
DrawerLink.displayName = 'DrawerLink';

export { DrawerLink };
