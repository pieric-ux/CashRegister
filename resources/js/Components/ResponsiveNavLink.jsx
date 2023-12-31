import clsx from 'clsx';
import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={clsx(
                'flex w-full items-start border-l-4 py-2 pl-3 pr-4 text-base font-medium transition duration-150 ease-in-out focus:outline-none',
                {
                    'border-sky-400 bg-sky-100 text-sky-700 focus:border-sky-700 focus:bg-sky-100 focus:text-sky-800 dark:border-sky-600 dark:bg-sky-900/50 dark:text-white dark:focus:border-sky-300 dark:focus:bg-sky-900 dark:focus:text-sky-200':
                        active,
                    'border-transparent text-gray-900 hover:border-gray-600 hover:bg-gray-200 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800 dark:text-white dark:hover:border-gray-200 dark:hover:bg-gray-600 dark:hover:text-gray-300 dark:focus:border-gray-600 dark:focus:bg-gray-700 dark:focus:text-gray-200':
                        !active,
                },
                className,
            )}
        >
            {children}
        </Link>
    );
}
