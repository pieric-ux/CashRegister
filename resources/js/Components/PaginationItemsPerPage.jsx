export default function PaginationItemsPerPage({ itemsPerPage, onChange, itemName }) {
    return (
        <select
            value={itemsPerPage}
            onChange={onChange}
            className='rounded-md border border-gray-300 px-2 py-1 pr-7 shadow-sm transition duration-300 ease-linear focus:border-sky-500 focus:ring-sky-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-sky-600 dark:focus:ring-sky-600'
            aria-label='Number of items per page'
        >
            <option value={5}>{`5 ${itemName}`}</option>
            <option value={10}>{`10 ${itemName}`}</option>
            <option value={20}>{`20 ${itemName}`}</option>
            <option value={50}>{`50 ${itemName}`}</option>
            <option value={100}>{`100 ${itemName}`}</option>
        </select>
    );
}
