import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

const DrawerHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>): JSX.Element => (
    <div className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)} {...props} />
);
DrawerHeader.displayName = 'DrawerHeader';

export { DrawerHeader };
