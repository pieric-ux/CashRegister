import { cn } from '@/lib/utils';
import { forwardRef, type HTMLAttributes } from 'react';
import { TableRow } from '@/Components/ui/table/tableRow';
import { TableBody } from '@/Components/ui/table/tableBody';
import { TableHead } from '@/Components/ui/table/tableHead';
import { TableCell } from '@/Components/ui/table/tableCell';
import { TableHeader } from '@/Components/ui/table/tableHeader';
import { TableFooter } from '@/Components/ui/table/tableFooter';
import { TableCaption } from '@/Components/ui/table/tableCaption';
import { cva, type VariantProps } from 'class-variance-authority';

const tableVariants = cva('', {
    variants: {
        variant: {
            default: 'w-full caption-bottom text-sm',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

interface TableProps extends HTMLAttributes<HTMLTableElement>, VariantProps<typeof tableVariants> {}

const Table = forwardRef<HTMLTableElement, TableProps>(({ className, variant, ...props }, ref) => (
    <table ref={ref} className={cn(tableVariants({ variant, className }))} {...props} />
));
Table.displayName = 'Table';

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
