'use client';

import { cn } from '@/lib/utils';
import { ScrollBar } from './scrollBar';
import { cva, type VariantProps } from 'class-variance-authority';
import { Root, Viewport, Corner } from '@radix-ui/react-scroll-area';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

const scrollAreaVariants = cva('', {
    variants: {
        variant: {
            default: 'relative overflow-auto',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

interface ScrollAreaProps
    extends ComponentPropsWithoutRef<typeof Root>,
        VariantProps<typeof scrollAreaVariants> {}

const ScrollArea = forwardRef<ElementRef<typeof Root>, ScrollAreaProps>(
    ({ className, variant, children, ...props }, ref) => (
        <Root ref={ref} className={cn(scrollAreaVariants({ variant, className }))} {...props}>
            <Viewport className='h-full w-full rounded-[inherit] p-2'>{children}</Viewport>
            <ScrollBar />
            <Corner />
        </Root>
    ),
);
ScrollArea.displayName = Root.displayName;

export { ScrollArea, ScrollBar };
