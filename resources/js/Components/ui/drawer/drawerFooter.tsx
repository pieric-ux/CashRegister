import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

const DrawerFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>): JSX.Element => (
    <div className={cn('mt-auto flex flex-col gap-2 pt-4', className)} {...props} />
);
DrawerFooter.displayName = 'DrawerFooter';

export { DrawerFooter };
