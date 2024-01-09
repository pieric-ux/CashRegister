import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Title, type DialogTitleProps as RadixDialogTitleProps } from '@radix-ui/react-dialog';

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
        VariantProps<typeof dialogTitleVariants>,
        RadixDialogTitleProps {}

const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
    ({ className, variant, ...props }, ref) => (
        <Title className={cn(dialogTitleVariants({ variant, className }))} ref={ref} {...props} />
    ),
);
DialogTitle.displayName = Title.displayName;

export { DialogTitle };
