import { cn } from '@/lib/utils';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { SelectScrollUpButton } from '@/Components/ui/select/selectScrollUpButton';
import { SelectScrollDownButton } from '@/Components/ui/select/selectScrollDownButton';
import {
    Content,
    Portal,
    Viewport,
    type SelectContentProps as RadixSelectContentProps,
} from '@radix-ui/react-select';

const selectContentVariants = cva(
    'relative z-50 overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    {
        variants: {
            variant: {
                default: 'rounded-md border bg-popover text-popover-foreground shadow-md',
            },
            size: {
                default: 'max-h-96 min-w-[8rem]',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface SelectContentProps
    extends ComponentPropsWithoutRef<typeof Content>,
        VariantProps<typeof selectContentVariants>,
        RadixSelectContentProps {}

const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
    ({ className, variant, size, children, position = 'popper', ...props }, ref) => (
        <Portal>
            <Content
                className={cn(
                    selectContentVariants({ variant, size, className }),
                    position === 'popper' &&
                        'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
                )}
                ref={ref}
                position={position}
                {...props}
            >
                <SelectScrollUpButton />
                <Viewport
                    className={cn(
                        'p-1',
                        position === 'popper' &&
                            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
                    )}
                >
                    {children}
                </Viewport>
                <SelectScrollDownButton />
            </Content>
        </Portal>
    ),
);
SelectContent.displayName = Content.displayName;

export { SelectContent };
