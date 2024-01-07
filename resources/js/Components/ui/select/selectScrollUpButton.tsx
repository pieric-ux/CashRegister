import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { ChevronUpIcon } from '@radix-ui/react-icons';
import { ScrollUpButton } from '@radix-ui/react-select';

import { cn } from '@/lib/utils';

const SelectScrollUpButton = forwardRef<
    ElementRef<typeof ScrollUpButton>,
    ComponentPropsWithoutRef<typeof ScrollUpButton>
>(({ className, ...props }, ref) => (
    <ScrollUpButton
        ref={ref}
        className={cn('flex cursor-default items-center justify-center py-1', className)}
        {...props}
    >
        <ChevronUpIcon />
    </ScrollUpButton>
));
SelectScrollUpButton.displayName = ScrollUpButton.displayName;

export { SelectScrollUpButton };
