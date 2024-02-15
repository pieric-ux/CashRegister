import { cn } from '@/lib/utils';
import { List } from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

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

const TabsList = forwardRef<ElementRef<typeof List>, TabsListProps>(
    ({ className, variant, ...props }, ref) => (
        <List ref={ref} className={cn(tabsListVariants({ variant, className }))} {...props} />
    ),
);
TabsList.displayName = List.displayName;

export { TabsList };
