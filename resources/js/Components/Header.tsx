import clsx from 'clsx';
import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import ThemeSwitcher from './themes/ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar/avatar';

export default function Header({
    user,
    title,
    avatarPath,
    RespNavLink,
    DropdownLink,
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
                    <h1 className='text-xl font-semibold text-gray-900 sm:text-2xl dark:text-gray-100'>
                        {title}
                    </h1>
                </div>
                <div className='flex items-center gap-2'>
                    <LanguageSwitcher localization={localization} />
                    <ThemeSwitcher />
                    <div className='hidden sm:flex'>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className='inline-flex rounded-md'>
                                    <button
                                        type='button'
                                        aria-label='User Dropdown Menu'
                                        className={clsx(
                                            'inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-900 transition duration-300 ease-linear',
                                            'hover:text-gray-600',
                                            'focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2',

                                            'dark:bg-gray-800 dark:text-white',
                                            'dark:hover:text-gray-400',
                                            'dark:focus:ring-offset-gray-800',
                                        )}
                                    >
                                        {user.first_name}

                                        <Avatar className='ml-2'>
                                            <AvatarImage src={avatarPath} alt='avatar' />
                                            <AvatarFallback>
                                                {user.first_name.charAt(0) +
                                                    user.last_name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>

                                        <svg
                                            className='-mr-0.5 ml-2 h-4 w-4'
                                            xmlns='http://www.w3.org/2000/svg'
                                            viewBox='0 0 20 20'
                                            fill='currentColor'
                                        >
                                            <path
                                                fillRule='evenodd'
                                                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                                                clipRule='evenodd'
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>{DropdownLink}</Dropdown.Content>
                        </Dropdown>
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
