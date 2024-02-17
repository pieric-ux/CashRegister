import { cn } from '@/lib/utils';
import { forwardRef, type InputHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    {
        variants: {
            variant: {
                default:
                    'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
                file: 'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

export interface InputProps
    extends InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof inputVariants> {
    isFocused?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant, type, isFocused = false, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(inputVariants({ variant, className }))}
                autoFocus={isFocused}
                ref={ref}
                {...props}
            />
        );
    },
);
Input.displayName = 'Input';

export { Input };
