import clsx from 'clsx';

export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type='checkbox'
            className={clsx(
                'rounded border-gray-300 shadow-sm',
                'checked:bg-sky-600',
                'focus:ring-sky-500',

                'dark:border-gray-700 dark:bg-gray-900',
                'dark:checked:bg-sky-500',
                'dark:focus:ring-sky-600 dark:focus:ring-offset-gray-800',
                className,
            )}
        />
    );
}
