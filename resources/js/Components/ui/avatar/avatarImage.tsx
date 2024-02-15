import { cn } from '@/lib/utils';
import { Image } from '@radix-ui/react-avatar';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

const avatarImageVariants = cva('aspect-square h-full w-full', {
    variants: {
        variant: {
            default: '',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface AvatarImageProps
    extends ComponentPropsWithoutRef<typeof Image>,
        VariantProps<typeof avatarImageVariants> {}

const AvatarImage = forwardRef<ElementRef<typeof Image>, AvatarImageProps>(
    ({ className, variant, ...props }, ref) => (
        <Image className={cn(avatarImageVariants({ variant, className }))} ref={ref} {...props} />
    ),
);
AvatarImage.displayName = Image.displayName;

export { AvatarImage };
