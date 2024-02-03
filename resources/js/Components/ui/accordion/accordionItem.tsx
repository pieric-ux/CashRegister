import { cn } from '@/lib/utils';
import { Item } from '@radix-ui/react-accordion';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const accordionItemVariants = cva('', {
    variants: {
        variant: {
            default: 'border-b',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface AccordionItemProps
    extends ComponentPropsWithoutRef<typeof Item>,
        VariantProps<typeof accordionItemVariants> {}

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
    ({ className, variant, ...props }, ref) => (
        <Item ref={ref} className={cn(accordionItemVariants({ variant, className }))} {...props} />
    ),
);
AccordionItem.displayName = 'AccordionItem';

export { AccordionItem, accordionItemVariants };
