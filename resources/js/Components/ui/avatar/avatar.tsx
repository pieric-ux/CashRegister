'use client';

import { cn } from '@/lib/utils';
import { Root } from '@radix-ui/react-avatar';
import { AvatarImage } from '@/Components/ui/avatar/avatarImage';
import { cva, type VariantProps } from 'class-variance-authority';
import { AvatarFallback } from '@/Components/ui/avatar/avatarFallback';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

const avatarVariants = cva('relative overflow-hidden', {
    variants: {
        variant: {
            default: 'flex shrink-0 rounded-full',
            square: 'flex shrink-0',
        },
        size: {
            default: 'h-12 w-12',
            avatar: 'h-52 w-52',
            poster: 'h-36 w-36',
            picture: 'h-16 w-16',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});

export interface AvatarProps
    extends ComponentPropsWithoutRef<typeof Root>,
        VariantProps<typeof avatarVariants> {}

const Avatar = forwardRef<ElementRef<typeof Root>, AvatarProps>(
    ({ className, variant, size, ...props }, ref) => (
        <Root className={cn(avatarVariants({ variant, size, className }))} ref={ref} {...props} />
    ),
);
Avatar.displayName = Root.displayName;

export { Avatar, AvatarImage, AvatarFallback };
