import { cn } from '@/lib/utils';
import { List } from '@radix-ui/react-tabs';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const tabsListVariants = cva('', {
    variants: {
        variant: {
            default:
                'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface TabsListProps
    extends ComponentPropsWithoutRef<typeof List>,
        VariantProps<typeof tabsListVariants> {}

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
    ({ className, variant, ...props }, ref) => (
        <List ref={ref} className={cn(tabsListVariants({ variant, className }))} {...props} />
    ),
);
TabsList.displayName = List.displayName;

export { TabsList };
