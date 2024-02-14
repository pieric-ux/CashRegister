import { cn } from '@/lib/utils';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
    SubContent,
    type DropdownMenuSubContentProps as RadixDropdownMenuSubContentProps,
} from '@radix-ui/react-dropdown-menu';

const dropdownSubContentVariants = cva(
    'z-50 overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    {
        variants: {
            variant: {
                default: 'rounded-md border bg-popover p-1 text-popover-foreground shadow-lg',
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

export interface DropdownSubContentProps
    extends ComponentPropsWithoutRef<typeof SubContent>,
        VariantProps<typeof dropdownSubContentVariants>,
        RadixDropdownMenuSubContentProps {}

const DropdownSubContent = forwardRef<HTMLDivElement, DropdownSubContentProps>(
    ({ className, variant, size, ...props }, ref) => (
        <SubContent
            className={cn(dropdownSubContentVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    ),
);
DropdownSubContent.displayName = SubContent.displayName;

export { DropdownSubContent };
