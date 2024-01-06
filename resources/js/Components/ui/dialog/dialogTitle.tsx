import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Title, DialogTitleProps as RadixDialogTitleProps } from '@radix-ui/react-dialog';

import { cn } from '@/lib/utils';

const dialogTitleVariants = cva('', {
    variants: {
        variant: {
            default: 'text-lg font-medium',
        },
        size: {
            default: '',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});

export interface DialogTitleProps
    extends ComponentPropsWithoutRef<typeof Title>,
        VariantProps<typeof dialogTitleVariants>,
        RadixDialogTitleProps {}

const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
    ({ className, variant, size, ...props }, ref) => (
        <Title
            className={cn(dialogTitleVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    ),
);
DialogTitle.displayName = Title.displayName;

export { DialogTitle };
