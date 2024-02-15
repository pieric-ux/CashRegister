import { cn } from '@/lib/utils';
import { Content } from '@radix-ui/react-accordion';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

const accordionContentVariants = cva('', {
    variants: {
        variant: {
            default: 'pb-4 pt-0',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface AccordionContentProps
    extends ComponentPropsWithoutRef<typeof Content>,
        VariantProps<typeof accordionContentVariants> {}

const AccordionContent = forwardRef<ElementRef<typeof Content>, AccordionContentProps>(
    ({ className, variant, children, ...props }, ref) => (
        <Content
            ref={ref}
            className='overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
            {...props}
        >
            <div className={cn(accordionContentVariants({ variant, className }))}>{children}</div>
        </Content>
    ),
);
AccordionContent.displayName = Content.displayName;

export { AccordionContent };
