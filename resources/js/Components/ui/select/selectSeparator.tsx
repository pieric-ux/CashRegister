import { cn } from '@/lib/utils';
import { Separator } from '@radix-ui/react-select';
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';

const SelectSeparator = forwardRef<
    ElementRef<typeof Separator>,
    ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
    <Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
));
SelectSeparator.displayName = Separator.displayName;

export { SelectSeparator };
