// TODO: Refactor
import clsx from 'clsx';
import { useState } from 'react';
import DropdownMenu from '@/Components/features/dropdown-menu/DropdownMenu';
import ThemeSwitcher from '@/Components/features/theme-switcher/ThemeSwitcher';
import LanguageSwitcher from '@/Components/features/language-switcher/LanguageSwitcher';

export default function Header({
    user,
    title,
    avatarPath,
    RespNavLink,
    dropdownLinks,
    sideBarOpen,
    setSideBarOpen,
    localization,
}) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <header
            className={clsx(
                'sticky top-0 z-40 w-full border-b border-gray-100 bg-white drop-shadow-sm transition duration-300 ease-linear',
                'dark:border-gray-700 dark:bg-gray-800 dark:drop-shadow-none',
            )}
        >
            <div className='mx-auto flex h-20 items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6 lg:px-8'>
                <div
                    className={clsx('invisible lg:invisible', {
                        'sm:visible': !sideBarOpen,
                    })}
                >
                    <button
                        aria-label='Open Sidebar'
                        aria-controls='sidebar'
                        onClick={(e) => {
                            e.stopPropagation();
                            setSideBarOpen(true);
                        }}
                        className={clsx(
                            'inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out',
                            'hover:bg-gray-100 hover:text-gray-500',
                            'focus:bg-gray-100 focus:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2',

                            'dark:text-gray-500',
                            'dark:hover:bg-gray-900 dark:hover:text-gray-400',
                            'dark:focus:bg-gray-900 dark:focus:text-gray-400 dark:focus:ring-offset-gray-800',
                        )}
                    >
                        <svg
                            className='h-6 w-6'
                            stroke='currentColor'
                            fill='none'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M4 6h16M4 12h16M4 18h16'
                            />
                        </svg>
                    </button>
                </div>
                <div className={clsx({ flex: title, hidden: !title })}>
                    <h1 className='text-xl font-semibold text-gray-900 dark:text-gray-100 sm:text-2xl'>
                        {title}
                    </h1>
                </div>
                <div className='flex items-center gap-2'>
                    <LanguageSwitcher localization={localization} />
                    <ThemeSwitcher />
                    <div className='hidden sm:flex'>
                        <DropdownMenu
                            user={user}
                            avatarPath={avatarPath}
                            dropdownLinks={dropdownLinks}
                        />
                    </div>

                    <div className='-mr-2 flex sm:hidden'>
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown((previousState) => !previousState)
                            }
                            className={clsx(
                                'inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out',
                                'hover:bg-gray-100 hover:text-gray-500',
                                'focus:bg-gray-100 focus:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2',

                                'dark:text-gray-500',
                                'dark:hover:bg-gray-900 dark:hover:text-gray-400',
                                'dark:focus:bg-gray-900 dark:focus:text-gray-400 dark:focus:ring-offset-gray-800',
                            )}
                        >
                            <svg
                                className='h-6 w-6'
                                stroke='currentColor'
                                fill='none'
                                viewBox='0 0 24 24'
                            >
                                {showingNavigationDropdown ? (
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M6 18L18 6M6 6l12 12'
                                    />
                                ) : (
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M4 6h16M4 12h16M4 18h16'
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={clsx({
                    block: showingNavigationDropdown,
                    hidden: !showingNavigationDropdown,
                })}
            >
                <div className='border-t border-gray-200 pb-1 pt-4 dark:border-gray-600'>
                    <div className='px-4'>
                        <div className='text-base font-medium text-gray-800 dark:text-gray-200'>
                            {user.first_name}
                        </div>
                        <div className='text-sm font-medium text-gray-500'>{user.email}</div>
                    </div>

                    <div className='mt-3 space-y-1'>{RespNavLink}</div>
                </div>
            </div>
        </header>
    );
}
