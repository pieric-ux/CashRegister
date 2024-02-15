import { cn } from '@/lib/utils';
import { Title } from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

const sheetTitleVariants = cva('', {
    variants: {
        variant: {
            default: 'text-lg font-semibold text-foreground',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface SheetTitleProps
    extends ComponentPropsWithoutRef<typeof Title>,
        VariantProps<typeof sheetTitleVariants> {}

const SheetTitle = forwardRef<ElementRef<typeof Title>, SheetTitleProps>(
    ({ className, variant, ...props }, ref) => (
        <Title ref={ref} className={cn(sheetTitleVariants({ variant, className }))} {...props} />
    ),
);
SheetTitle.displayName = Title.displayName;

export { SheetTitle };
