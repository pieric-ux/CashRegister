'use client';

import { cn } from '@/lib/utils';
import { SwitchThumb } from './switchThumb';
import { Root } from '@radix-ui/react-switch';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

const switchVariants = cva(
    'peer inline-flex shrink-0 cursor-pointer items-center rounded-full transition duration-75 ease-linear disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'border-2 border-transparent shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=checked]:bg-ring data-[state=unchecked]:bg-input',
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
        VariantProps<typeof switchVariants> {
    asChild?: boolean;
}

const Switch = forwardRef<ElementRef<typeof Root>, SwitchProps>(
    ({ className, variant, size, asChild = false, children, ...props }, ref) => (
        <Root className={cn(switchVariants({ variant, size, className }))} ref={ref} {...props}>
            {asChild ? children : <SwitchThumb />}
        </Root>
    ),
);
Switch.displayName = Root.displayName;

export { Switch, SwitchThumb };
