import { Link } from '@inertiajs/react';

export default function SideBarLink({ active = false, className = '', svg, children, ...props }) {
    return (
        <li>
            <Link
                {...props}
                className={
                    'flex items-center p-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 ' +
                    (active
                        ? 'border-2 border-sky-400 dark:border-sky-600'
                        : '') +
                    className
                }
            >
                {svg}
                <span className='ml-3'>{children}</span>
            </Link>
        </li>
    );
}
