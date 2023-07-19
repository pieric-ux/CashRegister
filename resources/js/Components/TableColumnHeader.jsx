import TableArrowIcon from "./TableArrowIcon";

export default function TableColumnHeader({ column, sortColumn, sortDirection, handleSort, className, children }) {
    return (
        <th
            className={`py-2 px-4 text-left cursor-pointer ${className}`}
            onClick={() => handleSort(column)}
        >
            <div className="flex items-center gap-1">
                {sortColumn === column ? (
                    <TableArrowIcon direction={sortDirection} />
                ) : (
                    <span className="w-4"></span>
                )}
                <p>{children}</p>
            </div>
        </th>
    );
}