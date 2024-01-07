import { forwardRef, ComponentPropsWithoutRef } from 'react';
import { Image, AvatarImageProps as RadixAvatarImageProps } from '@radix-ui/react-avatar';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const avatarImageVariants = cva('aspect-square h-full w-full', {
    variants: {
        variant: {
            default: 'backdrop-blur-md',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface AvatarImageProps
    extends ComponentPropsWithoutRef<typeof Image>,
        VariantProps<typeof avatarImageVariants>,
        RadixAvatarImageProps {}

const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
    ({ className, variant, ...props }, ref) => (
        <Image className={cn(avatarImageVariants({ variant, className }))} ref={ref} {...props} />
    ),
);
AvatarImage.displayName = Image.displayName;

export { AvatarImage };
