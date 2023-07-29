export function sortData(data, sortColumn, sortDirection) {
    return data.slice().sort((a, b) => {
        if (sortColumn) {
            let valueA = a[sortColumn];
            let valueB = b[sortColumn];

            if (sortColumn === "client_price" || sortColumn === "cost_price") {
                valueA = parseFloat(valueA);
                valueB = parseFloat(valueB);
            } else if (sortColumn === "is_consigned") {

            } else {
                valueA = valueA ? valueA.toLowerCase() : "";
                valueB = valueB ? valueB.toLowerCase() : "";
            }

            return sortDirection === "asc" ? (valueA > valueB ? 1 : -1) : (valueA < valueB ? 1 : -1);
        }
        return 0;
    });
}

export function filterData(data, searchTerm, columns, t) {
    if (!searchTerm) return data;
    const searchTermLowerCase = searchTerm.toLowerCase();

    return data.filter((item) =>
        columns.some((column) => {
            const value = item[column.key];

            if (typeof value === 'string') {
                return value.toLowerCase()?.includes(searchTermLowerCase);
            } else if (typeof value === 'number') {
                if (column.key === 'is_consigned' && (searchTermLowerCase === t('consigned'))) {
                    return value === 1;
                } else {
                    return value.toString() === searchTermLowerCase;
                }
            }

            return false;
        })
    );
}