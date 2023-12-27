import TableColumnHeader from "./TableColumnHeader";

export default function Table({
    data,
    columns,
    sortColumn,
    sortDirection,
    handleSort,
    actionsRenderer,
}) {
    return (
        <table className="min-w-full rounded-lg bg-white text-gray-900 shadow-md transition duration-300 ease-linear dark:bg-gray-800 dark:text-gray-100">
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
                    {actionsRenderer && (
                        <th className="px-4 py-2 text-center">
                            {actionsRenderer.header()}
                        </th>
                    )}
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        {columns.map((column) => (
                            <td
                                key={`${item.id}-${column.key}`}
                                className={`border-t border-gray-300 px-4 py-2 dark:border-gray-700 ${
                                    column.className || ""
                                }`}
                            >
                                {column.render ? (
                                    <div className="ml-5">
                                        {column.render(item)}
                                    </div>
                                ) : (
                                    <p className="ml-5">{item[column.key]}</p>
                                )}
                            </td>
                        ))}
                        {actionsRenderer && (
                            <td className="border-t border-gray-300 px-4 py-2 dark:border-gray-700">
                                {actionsRenderer.render(item)}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
