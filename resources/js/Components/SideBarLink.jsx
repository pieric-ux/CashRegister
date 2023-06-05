import { Link } from '@inertiajs/react';

export default function SideBarLink({ active = false, className = '', svg, children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'flex items-center p-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition ease-in-out duration-150 ' +
                (active
                    ? 'border-2 border-sky-400 dark:border-sky-600'
                    : '') +
                className
            }
        >
            {svg}
            <span className='ml-3'>{children}</span>
        </Link>
    );
}
