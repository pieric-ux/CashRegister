import clsx from 'clsx';
import TableArrowIcon from './old_TableArrowIcon';

export default function TableColumnHeader({
    column,
    sortColumn,
    sortDirection,
    handleSort,
    className,
    children,
}) {
    return (
        <th
            className={clsx('cursor-pointer px-4 py-2 text-left', className)}
            onClick={() => handleSort(column)}
        >
            <div className='flex items-center gap-1'>
                {sortColumn === column ? (
                    <TableArrowIcon direction={sortDirection} />
                ) : (
                    <svg
                        className='h-4 w-4 text-gray-600 dark:text-gray-300'
                        fill='currentColor'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 320 512'
                    >
                        <path d='M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z' />
                    </svg>
                )}
                <p>{children}</p>
            </div>
        </th>
    );
}
