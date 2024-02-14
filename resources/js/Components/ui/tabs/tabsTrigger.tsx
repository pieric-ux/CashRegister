import { cn } from '@/lib/utils';
import { Trigger } from '@radix-ui/react-tabs';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const tabsTriggerVariants = cva('', {
    variants: {
        variant: {
            default:
                'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface TabsTriggerProps
    extends ComponentPropsWithoutRef<typeof Trigger>,
        VariantProps<typeof tabsTriggerVariants> {}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
    ({ className, variant, ...props }, ref) => (
        <Trigger ref={ref} className={cn(tabsTriggerVariants({ variant, className }))} {...props} />
    ),
);
TabsTrigger.displayName = Trigger.displayName;

export { TabsTrigger };
