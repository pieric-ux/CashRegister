import { Slot } from '@radix-ui/react-slot';
import { useFormField } from './form';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

const FormControl = forwardRef<ElementRef<typeof Slot>, ComponentPropsWithoutRef<typeof Slot>>(
    ({ ...props }, ref) => {
        const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

        return (
            <Slot
                ref={ref}
                id={formItemId}
                aria-describedby={
                    !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`
                }
                aria-invalid={!!error}
                {...props}
            />
        );
    },
);
FormControl.displayName = 'FormControl';

export { FormControl };
