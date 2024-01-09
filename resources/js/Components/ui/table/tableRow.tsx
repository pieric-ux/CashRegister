import { forwardRef, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
    ({ className, ...props }, ref) => (
        <tr
            ref={ref}
            className={cn(
                'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
                className,
            )}
            {...props}
        />
    ),
);
TableRow.displayName = 'TableRow';

export { TableRow };
