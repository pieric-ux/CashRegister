import { useState } from "react";
import { Head } from "@inertiajs/react";
import { sortData, filterData } from "@/Utils/useTableUtils";
import CR_AppAdminLayout from "@/Layouts/CR_AppAdminLayout";
import CreateProductForm from "./Partials/CreateProductForm";
import UpdateProductForm from "./Partials/UpdateProductForm";
import UpdateProdutPicture from "./Partials/UpdateProductPicture";
import DeleteProductForm from "./Partials/DeleteProductForm";
import TextInput from "@/Components/TextInput";
import Table from "@/Components/Table";
import Pagination from "@/Components/Pagination";
import PaginationItemsPerPage from "@/Components/PaginationItemsPerPage";
import { useTranslation } from "react-i18next";

export default function Index({ customerAuth, application, products, categories, dishes, localization }) {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState("");
    const [sortDirection, setSortDirection] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage, setProductPerPage] = useState(10);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleProductPerPage = (e) => {
        setProductPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1);
    };

    const productsColumns = [
        { key: "picture", label: t('Picture'), className: "hidden lg:table-cell", render: (product) => <UpdateProdutPicture product={product} /> },
        { key: "name", label: t('Name') },
        { key: "unit", label: t('Unit'), className: "hidden md:table-cell" },
        { key: "client_price", label: t('Client Price'), className: "hidden lg:table-cell", render: (product) => `${product.client_price} ${t('currency_symbol')}` },
        { key: "cost_price", label: t('Cost Price'), className: "hidden xl:table-cell", render: (product) => `${product.cost_price} ${t('currency_symbol')}` },
        { key: "category", label: t('Category'), className: "hidden xl:table-cell", render: (product) => product.cr_categories_products?.name === 'No category' ? '' : product.cr_categories_products?.name },
        { key: "dish", label: t('Dish'), className: "hidden xl:table-cell", render: (product) => product.cr_dishes?.name === 'No dish' ? '' : `${product.cr_dishes?.name} ${product.cr_dishes?.unit}` },
    ];

    const renderProductsActions = {
        header: () => t('Actions'),
        render: (product) => (
            <div className="flex flex-col items-center justify-center gap-2">
                <UpdateProductForm product={product} categories={categories} dishes={dishes} />
                <DeleteProductForm product={product} />
            </div>
        )
    };

    const sortedByCreationDateProducts = products.slice().sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateA - dateB;
    });

    const sortedProducts = sortData(sortedByCreationDateProducts, sortColumn, sortDirection);
    const filteredProducts = filterData(sortedProducts, searchTerm, productsColumns, t);

    const indexOfLastProducts = currentPage * productPerPage;
    const indexOfFirstProducts = indexOfLastProducts - productPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProducts, indexOfLastProducts);


    return (
        <CR_AppAdminLayout auth={customerAuth} application={application} localization={localization}>
            <Head title={application.name} />
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg transition ease-linear duration-300">
                    <CreateProductForm className="max-w-xl mx-auto" application={application} />
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-end pr-4 mt-4 gap-2">
                    <PaginationItemsPerPage
                        itemsPerPage={productPerPage}
                        onChange={handleProductPerPage}
                        itemName={t('products')}
                    />
                    <TextInput
                        placeholder={t('Search products')}
                        className="w-64 dark:!bg-gray-800 placeholder:text-gray-600 dark:placeholder:text-gray-400"
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
                            totalPages={Math.ceil(filteredProducts.length / productPerPage)}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <div className="p-4 sm:p-8 text-center bg-white dark:bg-gray-800 shadow sm:rounded-lg transition ease-linear duration-300">
                        <p className="text-gray-900 dark:text-gray-100">{t('No products found.')}</p>
                    </div>
                )}
            </div>
        </CR_AppAdminLayout>
    );
}