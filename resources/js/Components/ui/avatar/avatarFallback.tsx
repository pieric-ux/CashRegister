import { forwardRef, ComponentPropsWithoutRef } from 'react';
import { Fallback, AvatarFallbackProps as RadixAvatarFallbackProps } from '@radix-ui/react-avatar';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const avatarFallbackVariants = cva('h-full w-full rounded-full bg-muted', {
    variants: {
        variant: {
            default: 'flex items-center justify-center',
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
