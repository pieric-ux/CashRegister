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
                        {user.first_name.charAt(0) + user.last_name.charAt(0)}
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
</Dropdown>;
