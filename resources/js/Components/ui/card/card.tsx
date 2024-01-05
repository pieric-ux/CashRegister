import { HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { CardContent } from './cardContent';
import { CardHeader } from './cardHeader';
import { CardTitle } from './cardTitle';
import { CardDescription } from './cardDescription';
import { CardFooter } from './cardFooter';

import { cn } from '@/lib/utils';

const cardVariants = cva(
    'border bg-card text-card-foreground shadow-md transition duration-300 ease-linear',
    {
        variants: {
            variant: {
                default: 'rounded-lg',
                sm: 'rounded-sm',
                md: 'rounded-md',
                xl: 'rounded-xl ',
            },
            size: {
                default: '',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface CardProps
    extends HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, variant, ...props }, ref) => (
    <div className={cn(cardVariants({ variant, className }))} ref={ref} {...props} />
));
Card.displayName = 'Card';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants };
