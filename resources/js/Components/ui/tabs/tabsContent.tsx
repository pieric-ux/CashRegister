import { cn } from '@/lib/utils';
import { Content } from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';

const tabsContentVariants = cva('', {
    variants: {
        variant: {
            default:
                'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface TabsContentProps
    extends ComponentPropsWithoutRef<typeof Content>,
        VariantProps<typeof tabsContentVariants> {}

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
    ({ className, variant, ...props }, ref) => (
        <Content ref={ref} className={cn(tabsContentVariants({ variant, className }))} {...props} />
    ),
);
TabsContent.displayName = Content.displayName;

export { TabsContent };
