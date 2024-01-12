import { cn } from '@/lib/utils';
import { useFormField } from './form';
import { type Root } from '@radix-ui/react-label';
import { Label } from '@/Components/ui/label/label';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

const FormLabel = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
    ({ className, ...props }, ref) => {
        const { error, formItemId } = useFormField();

        return (
            <Label
                ref={ref}
                className={cn(error && 'text-destructive', className)}
                htmlFor={formItemId}
                {...props}
            />
        );
    },
);
FormLabel.displayName = 'FormLabel';

export { FormLabel };
