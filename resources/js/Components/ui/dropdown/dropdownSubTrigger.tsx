import { cn } from '@/lib/utils';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { cva, type VariantProps } from 'class-variance-authority';
import {
    SubTrigger,
    type DropdownMenuSubTriggerProps as RadixDropdownMenuSubTriggerProps,
} from '@radix-ui/react-dropdown-menu';

const dropdownSubTriggerVariants = cva(
    'flex cursor-default select-none data-[state=open]:bg-accent',
    {
        variants: {
            variant: {
                default: 'items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent',
            },
            size: {
                default: '',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface DropdownSubTriggerProps
    extends ComponentPropsWithoutRef<typeof SubTrigger>,
        VariantProps<typeof dropdownSubTriggerVariants>,
        RadixDropdownMenuSubTriggerProps {
    inset?: boolean;
}

const DropdownSubTrigger = forwardRef<HTMLDivElement, DropdownSubTriggerProps>(
    ({ className, variant, size, inset = false, children, ...props }, ref) => (
        <SubTrigger
            ref={ref}
            className={cn(
                dropdownSubTriggerVariants({ variant, size, className }),
                inset && 'pl-8',
            )}
            {...props}
        >
            {children}
            <ChevronRightIcon className='ml-auto h-4 w-4' />
        </SubTrigger>
    ),
);
DropdownSubTrigger.displayName = SubTrigger.displayName;

export { DropdownSubTrigger };
