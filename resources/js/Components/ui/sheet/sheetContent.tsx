import { cn } from '@/lib/utils';
import { SheetOverlay } from './sheetOverlay';
import { Content, Portal } from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';

const sheetVariants = cva(
    'fixed z-50 gap-2 bg-sidebar p-6 drop-shadow-sm transition ease-in-out focus:outline-none data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out',
    {
        variants: {
            variant: {
                default: 'hidden flex-col sm:flex',
            },
            side: {
                top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
                bottom: 'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
                left: 'inset-y-0 left-0 h-full w-72 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
                right: 'inset-y-0 right-0 h-full w-72 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
            },
        },
        defaultVariants: {
            variant: 'default',
            side: 'left',
        },
    },
);

interface SheetContentProps
    extends ComponentPropsWithoutRef<typeof Content>,
        VariantProps<typeof sheetVariants> {}

const SheetContent = forwardRef<ElementRef<typeof Content>, SheetContentProps>(
    ({ side, className, variant, children, ...props }, ref) => (
        <Portal>
            <SheetOverlay className='hidden sm:flex' />
            <Content
                ref={ref}
                className={cn(sheetVariants({ side, variant, className }))}
                {...props}
            >
                {children}
            </Content>
        </Portal>
    ),
);
SheetContent.displayName = Content.displayName;

export { SheetContent };
