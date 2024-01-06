import { forwardRef, ComponentPropsWithoutRef } from 'react';
import { Image, AvatarImageProps as RadixAvatarImageProps } from '@radix-ui/react-avatar';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const avatarImageVariants = cva('h-full w-full backdrop-blur-md', {
    variants: {
        variant: {
            default: 'aspect-square',
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
