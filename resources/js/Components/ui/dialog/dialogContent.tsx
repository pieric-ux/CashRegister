import { cn } from '@/lib/utils';
import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import { cva, type VariantProps } from 'class-variance-authority';
import { DialogOverlay } from '@/Components/ui/dialog/dialogOverlay';
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import {
    Close,
    Content,
    Portal,
    type DialogContentProps as RadixDialogContentProps,
} from '@radix-ui/react-dialog';

const dialogContentVariants = cva(
    'fixed left-[50%] top-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg transition duration-300 ease-linear data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
    {
        variants: {
            variant: {
                default: 'grid',
                'flex-row': 'flex flex-row',
                'flex-col': 'flex flex-col',
            },
            size: {
                default: 'max-w-lg',
                sm: 'max-w-sm',
                md: 'max-w-md',
                xl: 'max-w-xl',
                '2xl': 'max-w-2xl',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface DialogContentProps
    extends ComponentPropsWithoutRef<typeof Content>,
        VariantProps<typeof dialogContentVariants>,
        RadixDialogContentProps {
    children?: ReactNode;
}

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
    ({ className, variant, size, children, ...props }, ref) => {
        const { t } = useTranslation();
        return (
            <Portal>
                <DialogOverlay />
                <Content
                    className={cn(dialogContentVariants({ variant, size, className }))}
                    ref={ref}
                    {...props}
                >
                    {children}
                    <Close className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
                        <Svg variant={'secondary'} type={'close'} size={'sm'} />
                        <span className='sr-only'>{t('Cancel')}</span>
                    </Close>
                </Content>
            </Portal>
        );
    },
);
DialogContent.displayName = Content.displayName;

export { DialogContent };
