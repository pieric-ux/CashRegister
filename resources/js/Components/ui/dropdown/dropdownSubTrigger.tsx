import { cn } from '@/lib/utils';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { SubTrigger } from '@radix-ui/react-dropdown-menu';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

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
        VariantProps<typeof dropdownSubTriggerVariants> {
    inset?: boolean;
}

const DropdownSubTrigger = forwardRef<ElementRef<typeof SubTrigger>, DropdownSubTriggerProps>(
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
