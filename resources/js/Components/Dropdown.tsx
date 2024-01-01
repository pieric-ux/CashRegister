import clsx from 'clsx';
import { useState, createContext, useContext, Fragment } from 'react';
import { Link } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

const DropDownContext = createContext();

const Dropdown = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className='relative'>{children}</div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children }) => {
    const { open, setOpen, toggleOpen } = useContext(DropDownContext);

    return (
        <>
            <div onClick={toggleOpen}>{children}</div>

            {open && <div className='fixed inset-0 z-40' onClick={() => setOpen(false)}></div>}
        </>
    );
};

const Content = ({
    align = 'right',
    width = '48',
    contentClasses = 'py-1 bg-white dark:bg-gray-700 transition ease-linear duration-300',
    children,
}) => {
    const { open, setOpen } = useContext(DropDownContext);

    return (
        <>
            <Transition
                as={Fragment}
                show={open}
                enter='transition ease-out duration-200'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
            >
                <div
                    className={clsx('absolute z-50 mt-2 origin-top rounded-md shadow-lg', {
                        'left-0 origin-top-left': align === 'left',
                        'right-0 origin-top-right': align === 'right',
                        'w-48': width === '48',
                    })}
                    onClick={() => setOpen(false)}
                >
                    <div
                        className={clsx(
                            'rounded-md ring-1 ring-black ring-opacity-5',
                            contentClasses,
                        )}
                    >
                        {children}
                    </div>
                </div>
            </Transition>
        </>
    );
};

const DropdownLink = ({ className = '', children, ...props }) => {
    return (
        <Link
            {...props}
            className={clsx(
                'block w-full px-4 py-2 text-left text-sm leading-5 text-gray-900 transition duration-150 ease-in-out',
                'hover:bg-gray-200',
                'focus:bg-gray-100 focus:outline-none',

                'dark:text-white',
                'dark:hover:bg-gray-800',
                'dark:focus:bg-gray-800',
                className,
            )}
        >
            {children}
        </Link>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;
