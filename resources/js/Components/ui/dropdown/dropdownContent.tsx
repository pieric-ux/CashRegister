import { cn } from '@/lib/utils';
import { forwardRef, ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
    Content,
    Portal,
    type DropdownMenuContentProps as RadixDropdownMenuContentProps,
} from '@radix-ui/react-dropdown-menu';

const dropdownContentVariants = cva(
    'z-50 overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    {
        variants: {
            variant: {
                default: 'rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
            },
            size: {
                default: 'min-w-[8rem]',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface DropdownContentProps
    extends ComponentPropsWithoutRef<typeof Content>,
        VariantProps<typeof dropdownContentVariants>,
        RadixDropdownMenuContentProps {}

const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
    ({ className, variant, size, sideOffset = 4, ...props }, ref) => (
        <Portal>
            <Content
                sideOffset={sideOffset}
                className={cn(dropdownContentVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        </Portal>
    ),
);
DropdownContent.displayName = Content.displayName;

export { DropdownContent, dropdownContentVariants };
