import { forwardRef, type HTMLAttributes } from 'react';
import { CardTitle } from '@/Components/ui/card/cardTitle';
import { CardFooter } from '@/Components/ui/card/cardFooter';
import { CardHeader } from '@/Components/ui/card/cardHeader';
import { CardContent } from '@/Components/ui/card/cardContent';
import { cva, type VariantProps } from 'class-variance-authority';
import { CardDescription } from '@/Components/ui/card/cardDescription';

import { cn } from '@/lib/utils';

const cardVariants = cva('transition duration-300 ease-linear', {
    variants: {
        variant: {
            default: 'bg-card text-card-foreground shadow-md',
            secondary: 'bg-background text-foreground shadow-md',
        },
        size: {
            default: 'rounded-lg',
            sm: 'rounded-sm',
            md: 'rounded-md',
            xl: 'rounded-xl ',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});

export interface CardProps
    extends HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, variant, ...props }, ref) => (
    <div className={cn(cardVariants({ variant, className }))} ref={ref} {...props} />
));
Card.displayName = 'Card';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
