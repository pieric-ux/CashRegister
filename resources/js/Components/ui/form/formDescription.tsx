import { cn } from '@/lib/utils';
import { useFormField } from './form';
import { forwardRef, type HTMLAttributes } from 'react';

const FormDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => {
        const { formDescriptionId } = useFormField();

        return (
            <p
                ref={ref}
                id={formDescriptionId}
                className={cn('text-[0.8rem] text-muted-foreground', className)}
                {...props}
            />
        );
    },
);
FormDescription.displayName = 'FormDescription';

export { FormDescription };
