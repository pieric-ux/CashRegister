import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md transition duration-300 ease-linear focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-sm font-medium text-primary-foreground shadow hover:bg-primary/80 focus-visible:ring-ring',
                destructive:
                    'bg-destructive text-sm font-medium text-destructive-foreground shadow-sm hover:bg-destructive/80 focus-visible:ring-destructive',
                outline:
                    'border border-input bg-background text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring',
                secondary:
                    'bg-secondary text-sm font-medium text-secondary-foreground shadow-sm hover:bg-secondary-foreground/15 focus-visible:ring-ring',
                ghost: 'text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring',
                link: 'text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:ring-ring',
                ring: 'w-full bg-ring text-base font-semibold uppercase text-white shadow-sm hover:bg-ring-foreground focus-visible:ring-ring',
            },
            size: {
                default: 'h-9 px-4 py-2',
                sm: 'h-8 px-3',
                lg: 'h-10 px-8',
                icon: 'h-9 w-9',
                sm_icon: 'h-7 w-7',
                touch: 'h-32 w-32',
                touchItem: 'h-20 w-20',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
