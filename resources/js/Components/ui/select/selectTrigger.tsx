import { cn } from '@/lib/utils';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
    Trigger,
    type SelectTriggerProps as RadixSelectTriggerProps,
} from '@radix-ui/react-select';

const selectTriggerVariants = cva(
    'flex whitespace-nowrap transition duration-300 ease-linear disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
    {
        variants: {
            variant: {
                default:
                    'items-center justify-between rounded-md border border-input bg-popover px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
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

export { SelectTrigger };
