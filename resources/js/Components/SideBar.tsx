import clsx from 'clsx';
import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import ApplicationLogoDark from './ApplicationLogoDark';
import { useEffect, useRef } from 'react';

export default function SideBar({ children, sideBarOpen, setSideBarOpen }) {
    const sideBarRef = useRef(null);

    useEffect(() => {
        function clickHandler(event) {
            if (sideBarOpen && !sideBarRef.current.contains(event.target)) {
                setSideBarOpen(false);
            }
        }

        function keyHandler(event) {
            if (event.keyCode === 27 && sideBarOpen) {
                setSideBarOpen(false);
            }
        }

        document.addEventListener('click', clickHandler);
        document.addEventListener('keydown', keyHandler);

        return () => {
            document.removeEventListener('click', clickHandler);
            document.removeEventListener('keydown', keyHandler);
        };
    }, [sideBarOpen, setSideBarOpen]);

    return (
        <aside
            className={clsx(
                'z-50 hidden min-h-screen w-72 flex-col overflow-y-hidden bg-gray-50 transition duration-300 ease-linear lg:flex',
                'dark:bg-gray-800',

                { 'absolute sm:flex': sideBarOpen, hidden: !sideBarOpen },
            )}
            ref={sideBarRef}
        >
            {/* SideBar Header*/}
            <header className='flex items-center p-4'>
                <Link
                    href='/'
                    className={clsx(
                        'focus:rounded-md focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2',
                        'dark:focus:bg-gray-900 dark:focus:ring-offset-gray-800',
                    )}
                    aria-label='Welcome Page'
                >
                    <ApplicationLogo className='m-auto block dark:hidden' />
                    <ApplicationLogoDark className='m-auto hidden dark:block' />
                </Link>
                <button
                    className={clsx(
                        'ml-10 inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out lg:hidden',
                        'hover:bg-gray-100 hover:text-gray-500',
                        'focus:bg-gray-100 focus:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2',

                        'dark:text-gray-500',
                        'dark:hover:bg-gray-900 dark:hover:text-gray-400',
                        'dark:focus:bg-gray-900 dark:focus:text-gray-400 dark:focus:ring-offset-gray-800',
                    )}
                    onClick={() => setSideBarOpen(!sideBarOpen)}
                    aria-label='Close Sidebar'
                    aria-controls='sidebar'
                    aria-expanded={sideBarOpen}
                >
                    <svg
                        stroke='currentColor'
                        fill='currentColor'
                        width='20'
                        height='18'
                        viewBox='0 0 20 18'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z'
                            fill=''
                        />
                    </svg>
                </button>
            </header>
            {/* SideBar Header*/}

            {/* SideBar Nav*/}
            <nav className='mt-6 h-full overflow-y-auto px-3 py-4'>
                <ul className='space-y-2 font-medium'>{children}</ul>
            </nav>
            {/* SideBar Nav*/}
        </aside>
    );
}
