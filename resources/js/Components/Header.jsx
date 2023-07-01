import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import DarkModeSwitcher from './DarkModeSwitcher';

export default function Header({ user, avatarPath, RespNavLink, DropdownLink, sideBarOpen, setSideBarOpen }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);


    return (
        <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 drop-shadow-sm dark:drop-shadow-none transition ease-linear duration-300">
            <div className="flex items-center justify-between h-20 mx-auto px-4 sm:gap-2 gap-4 sm:px-6 lg:px-8">
                <div className={`${sideBarOpen ? 'sm:invisible' : 'visibile'} lg:invisible sm:visible invisible items-center`}>
                    <button
                        aria-controls="sidebar"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSideBarOpen(true);
                        }}
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                    >
                        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
                <div className='flex items-center gap-2'>
                    <DarkModeSwitcher />
                    <div className="hidden sm:flex ">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-900 dark:text-white bg-white dark:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none transition ease-linear duration-300"
                                    >
                                        {user.first_name}
                                        <img src={avatarPath} alt="avatar" className="h-12 w-12 rounded-full ml-2 backdrop-blur-md" />


                                        <svg
                                            className="ml-2 -mr-0.5 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                {DropdownLink}
                            </Dropdown.Content>
                        </Dropdown>
                    </div>

                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path
                                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                    <div className="px-4">
                        <div className="font-medium text-base text-gray-800 dark:text-gray-200">{user.first_name}</div>
                        <div className="font-medium text-sm text-gray-500">{user.email}</div>
                    </div>

                    <div className="mt-3 space-y-1">
                        {RespNavLink}
                    </div>
                </div>
            </div>
        </header>
    );
}