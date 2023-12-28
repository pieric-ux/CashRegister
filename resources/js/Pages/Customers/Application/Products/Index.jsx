import Pagination from "@/Components/Pagination";
import PaginationItemsPerPage from "@/Components/PaginationItemsPerPage";
import Table from "@/Components/Table";
import TextInput from "@/Components/TextInput";
import CR_AppAdminLayout from "@/Layouts/CR_AppAdminLayout";
import { filterData, sortData } from "@/Utils/useTableUtils";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CreateProductForm from "./Partials/CreateProductForm";
import DeleteProductForm from "./Partials/DeleteProductForm";
import UpdateProductForm from "./Partials/UpdateProductForm";
import UpdateProdutPicture from "./Partials/UpdateProductPicture";

export default function Index({
    customerAuth,
    application,
    products,
    categories,
    dishes,
    localization,
}) {
    const { t } = useTranslation();

    {
        // Flavien: ce code (les states et leur logique) pourrait être extrait dans un hook car il est utilisé ailleurs
        /* State variables for handling search, sorting, and pagination */
    }
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState("");
    const [sortDirection, setSortDirection] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage, setProductPerPage] = useState(10);

    {
        /* Handler for search input change */
    }
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    {
        /* Handler for column sorting */
    }
    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    {
        /* Handler for page change */
    }
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    {
        /* Handler for items per page change */
    }
    const handleProductPerPage = (e) => {
        setProductPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1);
    };

    {
        /* Columns configuration for the table */
    }
    const productsColumns = [
        {
            key: "picture",
            label: t("Picture"),
            className: "hidden lg:table-cell",
            render: (product) => <UpdateProdutPicture product={product} />,
        },
        { key: "name", label: t("Name") },
        { key: "unit", label: t("Unit"), className: "hidden md:table-cell" },
        {
            key: "client_price",
            label: t("Client Price"),
            className: "hidden lg:table-cell",
            render: (product) =>
                `${product.client_price} ${t("currency_symbol")}`,
        },
        {
            key: "cost_price",
            label: t("Cost Price"),
            className: "hidden xl:table-cell",
            render: (product) =>
                `${product.cost_price} ${t("currency_symbol")}`,
        },
        {
            key: "category",
            label: t("Category"),
            className: "hidden xl:table-cell",
            render: (product) =>
                product.cr_categories_products?.name === "No category"
                    ? ""
                    : product.cr_categories_products?.name,
        },
        {
            key: "dish",
            label: t("Dish"),
            className: "hidden xl:table-cell",
            render: (product) =>
                product.cr_dishes?.name === "No dish"
                    ? ""
                    : `${product.cr_dishes?.name} ${product.cr_dishes?.unit}`,
        },
    ];

    {
        /* Configuration for rendering actions in each row */
    }
    const renderProductsActions = {
        header: () => t("Actions"),
        render: (product) => (
            <div className="flex flex-col items-center justify-center gap-2">
                <UpdateProductForm
                    product={product}
                    categories={categories}
                    dishes={dishes}
                />
                <DeleteProductForm product={product} />
            </div>
        ),
    };

    {
        /* Sorting products by creation date by ASC */
    }
    const sortedByCreationDateProducts = products.slice().sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateA - dateB;
    });

    {
        /* Applying sorting and filtering */
    }
    const sortedProducts = sortData(
        sortedByCreationDateProducts,
        sortColumn,
        sortDirection,
    );
    const filteredProducts = filterData(
        sortedProducts,
        searchTerm,
        productsColumns,
        t,
    );

    {
        /* Pagination calculation */
    }
    const indexOfLastProducts = currentPage * productPerPage;
    const indexOfFirstProducts = indexOfLastProducts - productPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProducts,
        indexOfLastProducts,
    );

    return (
        <CR_AppAdminLayout
            auth={customerAuth}
            application={application}
            localization={localization}
        >
            <Head title={application.name} />
            <div className="mx-auto max-w-7xl space-y-6 px-2 sm:px-6 lg:px-8">
                <div className="rounded-lg bg-white p-4 shadow-md transition duration-300 ease-linear dark:bg-gray-800 sm:p-8">
                    <CreateProductForm
                        className="mx-auto max-w-xl"
                        application={application}
                    />
                </div>
                <div className="mt-4 flex flex-col items-center justify-end gap-2 pr-4 sm:flex-row">
                    <PaginationItemsPerPage
                        itemsPerPage={productPerPage}
                        onChange={handleProductPerPage}
                        itemName={t("products")}
                    />
                    <TextInput
                        placeholder={t("Search products")}
                        className="w-64 placeholder:text-gray-600 dark:!bg-gray-800 dark:placeholder:text-gray-400"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                {filteredProducts.length > 0 ? (
                    <>
                        <Table
                            data={currentProducts}
                            columns={productsColumns}
                            sortColumn={sortColumn}
                            sortDirection={sortDirection}
                            handleSort={handleSort}
                            actionsRenderer={renderProductsActions}
                        />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(
                                filteredProducts.length / productPerPage,
                            )}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <div className="bg-white p-4 text-center shadow transition duration-300 ease-linear dark:bg-gray-800 sm:rounded-lg sm:p-8">
                        <p className="text-gray-900 dark:text-gray-100">
                            {t("No products found.")}
                        </p>
                    </div>
                )}
            </div>
        </CR_AppAdminLayout>
    );
}
