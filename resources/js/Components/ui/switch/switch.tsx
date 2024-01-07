'use client';

import { forwardRef, ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Root, SwitchProps as RadixSwitchProps } from '@radix-ui/react-switch';
import { SwitchThumb } from './switchThumb';

import { cn } from '@/lib/utils';

const switchVariants = cva(
    'peer inline-flex shrink-0 cursor-pointer items-center rounded-full transition duration-75 ease-linear disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'border-2 border-transparent shadow-sm  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
            },
            size: {
                default: 'h-5 w-9',
                theme: 'h-8 w-14',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface SwitchProps
    extends ComponentPropsWithoutRef<typeof Root>,
        VariantProps<typeof switchVariants>,
        RadixSwitchProps {
    asChild?: boolean;
}

const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
    ({ className, variant, size, asChild = false, children, ...props }, ref) => (
        <Root className={cn(switchVariants({ variant, size, className }))} ref={ref} {...props}>
            {asChild ? children : <SwitchThumb />}
        </Root>
    ),
);
Switch.displayName = Root.displayName;

export { Switch, SwitchThumb, switchVariants };
