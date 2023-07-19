export function sortData(data, sortColumn, sortDirection) {
    return data.slice().sort((a, b) => {
        if (sortColumn) {
            const valueA = a[sortColumn] ? a[sortColumn].toLowerCase() : "";
            const valueB = b[sortColumn] ? b[sortColumn].toLowerCase() : "";
            return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        }
        return 0;
    });
}

export function filterData(data, searchTerm, columns) {
    if (!searchTerm) return data;
    const searchTermLowerCase = searchTerm.toLowerCase();
    return data.filter((item) =>
        columns.some((column) => item[column.key]?.toLowerCase().includes(searchTermLowerCase))
    );
}