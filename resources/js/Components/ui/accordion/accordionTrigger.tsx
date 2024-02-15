import { cn } from '@/lib/utils';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Header, Trigger } from '@radix-ui/react-accordion';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const accordionTriggerVariants = cva('', {
    variants: {
        variant: {
            default:
                'flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface AccordionTriggerProps
    extends ComponentPropsWithoutRef<typeof Trigger>,
        VariantProps<typeof accordionTriggerVariants> {}

const AccordionTrigger = forwardRef<ElementRef<typeof Trigger>, AccordionTriggerProps>(
    ({ className, variant, children, ...props }, ref) => (
        <Header className='flex'>
            <Trigger
                ref={ref}
                className={cn(accordionTriggerVariants({ variant, className }))}
                {...props}
            >
                {children}
                <ChevronDownIcon className='h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200' />
            </Trigger>
        </Header>
    ),
);
AccordionTrigger.displayName = Trigger.displayName;

export { AccordionTrigger };
