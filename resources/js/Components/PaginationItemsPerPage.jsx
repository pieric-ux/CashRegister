export default function PaginationItemsPerPage({ itemsPerPage, onChange, itemName }) {
    return (
        <select
            value={itemsPerPage}
            onChange={onChange}
            className="px-2 pr-7 py-1 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 dark:text-gray-300 focus:border-sky-500 dark:focus:border-sky-600 focus:ring-sky-500 dark:focus:ring-sky-600 rounded-md shadow-sm transition ease-linear duration-300"
            aria-label="Number of items per page"
        >
            <option value={5}>{`5 ${itemName}`}</option>
            <option value={10}>{`10 ${itemName}`}</option>
            <option value={20}>{`20 ${itemName}`}</option>
            <option value={50}>{`50 ${itemName}`}</option>
            <option value={100}>{`100 ${itemName}`}</option>
        </select>
    );
}