import { FC, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const dropdownShortcutVariants = cva('', {
    variants: {
        variant: {
            default: 'ml-auto text-xs tracking-widest opacity-60',
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

export interface DropdownShortcutProps
    extends HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof dropdownShortcutVariants> {}

const DropdownShortcut: FC<DropdownShortcutProps> = ({ className, variant, size, ...props }) => {
    return (
        <span className={cn(dropdownShortcutVariants({ variant, size, className }))} {...props} />
    );
};
DropdownShortcut.displayName = 'DropdownMenuShortcut';

export { DropdownShortcut, dropdownShortcutVariants };
