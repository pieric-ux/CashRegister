import { cn } from '@/lib/utils';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
    Fallback,
    type AvatarFallbackProps as RadixAvatarFallbackProps,
} from '@radix-ui/react-avatar';

const avatarFallbackVariants = cva('flex h-full w-full items-center justify-center', {
    variants: {
        variant: {
            default: 'bg-muted',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface AvatarFallbackProps
    extends ComponentPropsWithoutRef<typeof Fallback>,
        VariantProps<typeof avatarFallbackVariants>,
        RadixAvatarFallbackProps {}

const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(
    ({ className, variant, ...props }, ref) => (
        <Fallback
            className={cn(avatarFallbackVariants({ variant, className }))}
            ref={ref}
            {...props}
        />
    ),
);
AvatarFallback.displayName = Fallback.displayName;

export { AvatarFallback };
