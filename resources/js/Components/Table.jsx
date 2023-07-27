import TableColumnHeader from "./TableColumnHeader";

export default function Table({ data, columns, sortColumn, sortDirection, handleSort, actionsRenderer }) {
    return (
        <table className="min-w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md rounded-lg transition ease-linear duration-300">
            <thead>
                <tr>
                    {columns.map((column) => (
                        <TableColumnHeader
                            key={column.key}
                            column={column.key}
                            sortColumn={sortColumn}
                            sortDirection={sortDirection}
                            handleSort={handleSort}
                            className={column.className}
                        >
                            {column.label}
                        </TableColumnHeader>
                    ))}
                    {actionsRenderer && <th className="py-2 px-4 text-center">{actionsRenderer.header()}</th>}
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        {columns.map((column) => (
                            <td key={`${item.id}-${column.key}`} className={`py-2 px-4 border-t border-gray-300 dark:border-gray-700 ${column.className || ''}`}>
                                <p className="ml-5">{item[column.key]}</p>
                            </td>
                        ))}
                        {actionsRenderer && (
                            <td className="py-2 px-4 border-t border-gray-300 dark:border-gray-700">
                                {actionsRenderer.render(item)}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}