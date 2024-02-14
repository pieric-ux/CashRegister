'use client';

import { cn } from '@/lib/utils';
import { CheckIcon } from '@radix-ui/react-icons';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import {
    Root,
    Indicator,
    type CheckboxProps as RadixCheckboxProps,
} from '@radix-ui/react-checkbox';

const checkboxVariants = cva(
    'peer shrink-0 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-ring data-[state=checked]:text-primary-foreground',
    {
        variants: {
            variant: {
                default:
                    'rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            },
            size: {
                default: 'h-4 w-4',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface CheckboxProps
    extends ComponentPropsWithoutRef<typeof Root>,
        VariantProps<typeof checkboxVariants>,
        RadixCheckboxProps {}

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
    ({ className, variant, size, ...props }, ref) => (
        <Root ref={ref} className={cn(checkboxVariants({ variant, size, className }))} {...props}>
            <Indicator className={cn('flex items-center justify-center text-current')}>
                <CheckIcon className={cn(checkboxVariants({ size }))} />
            </Indicator>
        </Root>
    ),
);
Checkbox.displayName = Root.displayName;

export { Checkbox };
