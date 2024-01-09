import { cn } from '@/lib/utils';
import { forwardRef, HTMLAttributes } from 'react';

const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, ...props }, ref) => (
        <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
    ),
);
TableBody.displayName = 'TableBody';

export { TableBody };
