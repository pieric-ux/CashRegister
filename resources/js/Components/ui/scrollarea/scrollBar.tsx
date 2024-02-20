import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';
import { ScrollAreaThumb, ScrollAreaScrollbar } from '@radix-ui/react-scroll-area';

import { cn } from '@/lib/utils';

const ScrollBar = forwardRef<
    ElementRef<typeof ScrollAreaScrollbar>,
    ComponentPropsWithoutRef<typeof ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
    <ScrollAreaScrollbar
        ref={ref}
        orientation={orientation}
        className={cn(
            'flex touch-none select-none transition-colors',
            orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-[1px]',
            orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent p-[1px]',
            className,
        )}
        {...props}
    >
        <ScrollAreaThumb className='relative flex-1 rounded-full bg-border' />
    </ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaScrollbar.displayName;

export { ScrollBar };
