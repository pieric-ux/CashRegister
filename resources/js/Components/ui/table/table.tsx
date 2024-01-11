import { forwardRef, type HTMLAttributes } from 'react';
import { TableRow } from '@/Components/ui/table/tableRow';
import { TableBody } from '@/Components/ui/table/tableBody';
import { TableHead } from '@/Components/ui/table/tableHead';
import { TableCell } from '@/Components/ui/table/tableCell';
import { TableHeader } from '@/Components/ui/table/tableHeader';
import { TableFooter } from '@/Components/ui/table/tableFooter';
import { TableCaption } from '@/Components/ui/table/tableCaption';

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
