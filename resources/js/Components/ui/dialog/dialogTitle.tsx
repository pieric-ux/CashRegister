import { cn } from '@/lib/utils';
import { Title } from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

const dialogTitleVariants = cva('', {
    variants: {
        variant: {
            default: 'text-lg font-medium',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface DialogTitleProps
    extends ComponentPropsWithoutRef<typeof Title>,
        VariantProps<typeof dialogTitleVariants> {}

const DialogTitle = forwardRef<ElementRef<typeof Title>, DialogTitleProps>(
    ({ className, variant, ...props }, ref) => (
        <Title className={cn(dialogTitleVariants({ variant, className }))} ref={ref} {...props} />
    ),
);
DialogTitle.displayName = Title.displayName;

export { DialogTitle };
