import { cn } from '@/lib/utils';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { ScrollDownButton } from '@radix-ui/react-select';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

const SelectScrollDownButton = forwardRef<
    ElementRef<typeof ScrollDownButton>,
    ComponentPropsWithoutRef<typeof ScrollDownButton>
>(({ className, ...props }, ref) => (
    <ScrollDownButton
        ref={ref}
        className={cn('flex cursor-default items-center justify-center py-1', className)}
        {...props}
    >
        <ChevronDownIcon />
    </ScrollDownButton>
));
SelectScrollDownButton.displayName = ScrollDownButton.displayName;

export { SelectScrollDownButton };
