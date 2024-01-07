import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { Separator } from '@radix-ui/react-select';

import { cn } from '@/lib/utils';

const SelectSeparator = forwardRef<
    ElementRef<typeof Separator>,
    ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
    <Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
));
SelectSeparator.displayName = Separator.displayName;

export { SelectSeparator };
