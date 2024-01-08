'use client';

import { forwardRef, ComponentPropsWithoutRef } from 'react';
import { AvatarImage } from './avatarImage';
import { AvatarFallback } from './avatarFallback';
import { Root, type AvatarProps as RadixAvatarProps } from '@radix-ui/react-avatar';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const avatarVariants = cva('relative overflow-hidden rounded-full', {
    variants: {
        variant: {
            default: 'flex shrink-0',
        },
        size: {
            default: 'h-12 w-12',
            update: 'h-52 w-52',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});

export interface AvatarProps
    extends ComponentPropsWithoutRef<typeof Root>,
        VariantProps<typeof avatarVariants>,
        RadixAvatarProps {}

const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
    ({ className, variant, size, ...props }, ref) => (
        <Root className={cn(avatarVariants({ variant, size, className }))} ref={ref} {...props} />
    ),
);
Avatar.displayName = Root.displayName;

export { Avatar, AvatarImage, AvatarFallback, avatarVariants };