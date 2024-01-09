import { cn } from '@/lib/utils';
import { forwardRef, HTMLAttributes } from 'react';

const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, ...props }, ref) => (
        <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
    ),
);
TableHeader.displayName = 'TableHeader';

export { TableHeader };
