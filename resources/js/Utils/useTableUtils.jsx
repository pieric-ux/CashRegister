{
    /* This function sorts the data based on the specified sorting criteria. */
}
export function sortData(data, sortColumn, sortDirection) {
    return data.slice().sort((a, b) => {
        if (sortColumn) {
            let valueA, valueB;

            {
                /* Extract values to compare based on the sorting column */
            }
            if (sortColumn === 'paymentMethod') {
                valueA = a.cr_payment_methods?.name?.toLowerCase();
                valueB = b.cr_payment_methods?.name?.toLowerCase();
            } else if (sortColumn === 'category') {
                valueA = a.cr_categories_products?.name?.toLowerCase();
                valueB = b.cr_categories_products?.name?.toLowerCase();
            } else if (sortColumn === 'dish') {
                valueA = a.cr_dishes?.unit?.toLowerCase();
                valueB = b.cr_dishes?.unit?.toLowerCase();
            } else {
                valueA = a[sortColumn];
                valueB = b[sortColumn];
            }
            {
                /* Convert values to numbers if needed */
            }
            if (
                sortColumn === 'client_price' ||
                sortColumn === 'cost_price' ||
                sortColumn === 'total'
            ) {
                valueA = parseFloat(valueA);
                valueB = parseFloat(valueB);
            } else if (sortColumn === 'is_consigned' || sortColumn === 'is_SoldSeparately') {
            } else if (sortColumn !== 'paymentMethod') {
                valueA = valueA ? valueA.toLowerCase() : '';
                valueB = valueB ? valueB.toLowerCase() : '';
            }

            {
                /* Compare based on the sorting direction */
            }
            return sortDirection === 'asc' ? (valueA > valueB ? 1 : -1) : valueA < valueB ? 1 : -1;
        }
        return 0;
    });
}

{
    /* This function filters the data based on the search term and specified columns. */
}
export function filterData(data, searchTerm, columns, t) {
    {
        /* Return unfiltered data if no search term */
    }
    if (!searchTerm) return data;
    const searchTermLowerCase = searchTerm.toLowerCase();

    return data.filter((item) =>
        columns.some((column) => {
            const value = item[column.key];

            {
                /* Filtering logic based on value type */
            }
            if (typeof value === 'string') {
                return value.toLowerCase()?.includes(searchTermLowerCase);
            } else if (typeof value === 'number') {
                {
                    /* Special filtering for boolean columns */
                }
                if (column.key === 'is_consigned' && searchTermLowerCase === t('consigned')) {
                    return value === 1;
                } else {
                    return value.toString() === searchTermLowerCase;
                }
            } else if (column.key === 'category') {
                const categoryName = item.cr_categories_products?.name?.toLowerCase();
                return categoryName?.includes(searchTermLowerCase);
            } else if (column.key === 'dish') {
                const dishName = item.cr_dishes?.name?.toLowerCase();
                return dishName?.includes(searchTermLowerCase);
            } else if (column.key === 'paymentMethod') {
                const paymentMethodName = item.cr_payment_methods?.name?.toLowerCase();
                return paymentMethodName?.includes(searchTermLowerCase);
            }
            return false;
        }),
    );
}
