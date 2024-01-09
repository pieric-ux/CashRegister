import { forwardRef, HTMLAttributes } from 'react';
import { TableHeader } from './tableHeader';
import { TableBody } from './tableBody';
import { TableFooter } from './tableFooter';
import { TableRow } from './tableRow';
import { TableHead } from './tableHead';
import { TableCell } from './tableCell';
import { TableCaption } from './tableCaption';

import { cn } from '@/lib/utils';

const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
    ({ className, ...props }, ref) => (
        <div className='relative w-full overflow-auto'>
            <table
                ref={ref}
                className={cn('w-full caption-bottom text-sm', className)}
                {...props}
            />
        </div>
    ),
);
Table.displayName = 'Table';

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
