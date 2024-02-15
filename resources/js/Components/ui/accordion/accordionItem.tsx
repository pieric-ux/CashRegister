import { cn } from '@/lib/utils';
import { Item } from '@radix-ui/react-accordion';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

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

const AccordionItem = forwardRef<ElementRef<typeof Item>, AccordionItemProps>(
    ({ className, variant, ...props }, ref) => (
        <Item ref={ref} className={cn(accordionItemVariants({ variant, className }))} {...props} />
    ),
);
AccordionItem.displayName = 'AccordionItem';

export { AccordionItem };
