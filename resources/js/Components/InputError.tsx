import clsx from 'clsx';

export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p {...props} className={clsx('text-sm text-red-600 dark:text-red-400 ', className)}>
            {message}
        </p>
    ) : null;
}
