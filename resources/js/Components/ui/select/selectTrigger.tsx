import { cn } from '@/lib/utils';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
    Trigger,
    type SelectTriggerProps as RadixSelectTriggerProps,
} from '@radix-ui/react-select';

const selectTriggerVariants = cva(
    'flex whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
    {
        variants: {
            variant: {
                default:
                    'items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring',
            },
            size: {
                default: 'h-9 w-full',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface SelectTriggerProps
    extends ComponentPropsWithoutRef<typeof Trigger>,
        VariantProps<typeof selectTriggerVariants>,
        RadixSelectTriggerProps {}

const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
    ({ className, variant, size, children, ...props }, ref) => (
        <Trigger
            ref={ref}
            className={cn(selectTriggerVariants({ variant, size, className }))}
            {...props}
        >
            {children}
        </Trigger>
    ),
);
SelectTrigger.displayName = Trigger.displayName;

export { SelectTrigger, selectTriggerVariants };
