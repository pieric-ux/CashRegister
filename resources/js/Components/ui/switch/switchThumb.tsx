import { cn } from '@/lib/utils';
import { Thumb } from '@radix-ui/react-switch';
import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const switchThumbVariants = cva(
    'pointer-events-none flex items-center justify-center rounded-full transition duration-75 ease-linear',
    {
        variants: {
            variant: {
                default: 'bg-white shadow-lg ring-0',
            },
            size: {
                default:
                    'h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
                theme: 'h-6 w-6 data-[state=checked]:translate-x-[1.625rem] data-[state=unchecked]:translate-x-0.5',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface SwitchThumbProps
    extends HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof switchThumbVariants> {}

const SwitchThumb = forwardRef<HTMLSpanElement, SwitchThumbProps>(
    ({ className, variant, size, ...props }, ref) => (
        <Thumb
            className={cn(switchThumbVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    ),
);

SwitchThumb.displayName = Thumb.displayName;

export { SwitchThumb };
