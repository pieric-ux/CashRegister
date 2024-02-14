import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
    'border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                default:
                    'inline-flex items-center rounded-md border-transparent bg-primary px-2.5 py-0.5 text-primary-foreground shadow hover:bg-primary/80 focus:ring-ring',
                secondary:
                    'inline-flex items-center rounded-md border-transparent bg-secondary px-2.5 py-0.5 text-secondary-foreground hover:bg-secondary/80 focus:ring-ring',
                destructive:
                    'inline-flex items-center rounded-md border-transparent bg-destructive px-2.5 py-0.5 text-destructive-foreground shadow hover:bg-destructive/80 focus:ring-destructive',
                outline:
                    'inline-flex items-center rounded-md px-2.5 py-0.5 text-foreground focus:ring-ring',
                rounded:
                    'absolute right-0 top-0 flex -translate-y-[50%] translate-x-[50%] items-center justify-center rounded-full border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80 focus:ring-destructive',
            },
            size: {
                default: '',
                rounded: 'h-5 w-5',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface BadgeProps
    extends HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps): JSX.Element {
    return <div className={cn(badgeVariants({ variant, size, className }))} {...props} />;
}

export { Badge };
