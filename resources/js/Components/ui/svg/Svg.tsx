import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { actionIcons, sideBarIcons } from './iconsDefinitions';

import { cn } from '@/lib/utils';

const svgVariants = cva('', {
    variants: {
        variant: {
            default: 'text-background',
            destructive: 'text-background dark:text-foreground',
            sideBar: 'text-foreground/70',
        },
        size: {
            default: 'h-5 w-5',
            sm: 'h-4 w-4',
            lg: 'h-6 w-6',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});

type IconType = keyof typeof actionIcons | keyof typeof sideBarIcons;

export interface SvgProps
    extends React.SVGAttributes<SVGSVGElement>,
        VariantProps<typeof svgVariants> {
    type: IconType;
}

const Svg: React.FC<SvgProps> = ({ className, type, variant, size, ...props }) => {
    const allIcons = { ...actionIcons, ...sideBarIcons };
    const { fill, xmlns, viewBox, path } = allIcons[type];
    return (
        <svg
            className={cn(svgVariants({ variant, size, className }))}
            fill={fill}
            xmlns={xmlns}
            viewBox={viewBox}
            {...props}
        >
            {path}
        </svg>
    );
};

Svg.displayName = 'Svg';

export { Svg, svgVariants };
