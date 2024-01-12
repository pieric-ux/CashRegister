import { cn } from '@/lib/utils';
import { useFormField } from './form';
import { forwardRef, type HTMLAttributes } from 'react';

const FormMessage = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
    ({ className, children, ...props }, ref) => {
        const { error, formMessageId } = useFormField();
        const body = error ? String(error?.message) : children;

        if (!body) {
            return null;
        }

        return (
            <p
                ref={ref}
                id={formMessageId}
                className={cn('text-[0.8rem] font-medium text-destructive', className)}
                {...props}
            >
                {body}
            </p>
        );
    },
);
FormMessage.displayName = 'FormMessage';

export { FormMessage };
