import { cn } from '@/lib/utils';
import { CheckIcon } from '@radix-ui/react-icons';
import { forwardRef, ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
    Item,
    ItemIndicator,
    ItemText,
    type SelectItemProps as RadixSelectItemProps,
} from '@radix-ui/react-select';

const selectItemVariants = cva(
    'relative flex cursor-default select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground',
            },
            size: {
                default: 'w-full',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface SelectItemProps
    extends ComponentPropsWithoutRef<typeof Item>,
        VariantProps<typeof selectItemVariants>,
        RadixSelectItemProps {}

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
    ({ className, variant, size, children, ...props }, ref) => (
        <Item className={cn(selectItemVariants({ variant, size, className }))} ref={ref} {...props}>
            <span className='absolute right-2 flex h-3.5 w-3.5 items-center justify-center'>
                <ItemIndicator>
                    <CheckIcon className='h-4 w-4' />
                </ItemIndicator>
            </span>
            <ItemText>{children}</ItemText>
        </Item>
    ),
);
SelectItem.displayName = Item.displayName;

export { SelectItem, selectItemVariants };
