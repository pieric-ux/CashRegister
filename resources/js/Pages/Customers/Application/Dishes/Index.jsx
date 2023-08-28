import { useState } from "react";
import { Head } from "@inertiajs/react";
import { sortData, filterData } from "@/Utils/useTableUtils";
import CR_AppAdminLayout from "@/Layouts/CR_AppAdminLayout";
import CreateDishForm from "./Partials/CreateDishForm";
import TextInput from "@/Components/TextInput";
import Table from "@/Components/Table";
import Pagination from "@/Components/Pagination";
import PaginationItemsPerPage from "@/Components/PaginationItemsPerPage";
import { useTranslation } from "react-i18next";
import Checkbox from "@/Components/Checkbox";
import UpdateDishForm from "./Partials/UpdateDishForm";
import DeleteDishForm from "./Partials/DeleteDishForm";
import UpdateDishPicture from "./Partials/UpdateDishPicture";

export default function Index({ customerAuth, application, dishes, localization }) {
    const { t } = useTranslation();

    {/* State variables for handling search, sorting, and pagination */ }
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState("");
    const [sortDirection, setSortDirection] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [dishesPerPage, setDishesPerPage] = useState(10);

    {/* Handler for search input change */ }
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    {/* Handler for column sorting */ }
    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    {/* Handler for page change */ }
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    {/* Handler for items per page change */ }
    const handleDishesPerPageChange = (e) => {
        setDishesPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1);
    };

    {/* Columns configuration for the table */ }
    const dishesColumns = [
        { key: "picture", label: t('Picture'), className: "hidden lg:table-cell", render: (dish) => <UpdateDishPicture dish={dish} /> },
        { key: "name", label: t('Name') },
        { key: "unit", label: t('Unit'), className: "hidden md:table-cell" },
        { key: "client_price", label: t('Client Price'), className: "hidden xl:table-cell", render: (dish) => `${dish.client_price} ${t('currency_symbol')}` },
        { key: "cost_price", label: t('Cost Price'), className: "hidden xl:table-cell", render: (dish) => `${dish.cost_price} ${t('currency_symbol')}` },
        {
            key: "is_consigned", label: t('Consigned'), className: "hidden md:table-cell", render: (dish) => (
                <Checkbox className="disabled:opacity-50 disabled:cursor-not-allowed" checked={dish.is_consigned} disabled />
            )
        },
        {
            key: "is_SoldSeparately", label: t('Sold Separately'), className: "hidden lg:table-cell", render: (dish) => (
                <Checkbox className="disabled:opacity-50 disabled:cursor-not-allowed" checked={dish.is_SoldSeparately} disabled />
            )
        },
    ];

    {/* Configuration for rendering actions in each row */ }
    const renderDishesActions = {
        header: () => t('Actions'),
        render: (dish) => (
            <div className="flex items-center justify-center gap-2">
                <UpdateDishForm dish={dish} />
                <DeleteDishForm dish={dish} />
            </div>
        )
    };

    {/* Sorting products by creation date by ASC */ }
    const sortedByCreationDateDishes = dishes.slice(1).sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateA - dateB;
    });

    {/* Applying sorting and filtering */ }
    const sortedDishes = sortData(sortedByCreationDateDishes, sortColumn, sortDirection);
    const filteredDishes = filterData(sortedDishes, searchTerm, dishesColumns, t);

    {/* Pagination calculation */ }
    const indexOfLastDishes = currentPage * dishesPerPage;
    const indexOfFirstDishes = indexOfLastDishes - dishesPerPage;
    const currentDishes = filteredDishes.slice(indexOfFirstDishes, indexOfLastDishes);


    return (
        <CR_AppAdminLayout auth={customerAuth} application={application} localization={localization}>
            <Head title={application.name} />
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg transition ease-linear duration-300">
                    <CreateDishForm className="max-w-xl mx-auto" application={application} />
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-end pr-4 mt-4 gap-2">
                    <PaginationItemsPerPage
                        itemsPerPage={dishesPerPage}
                        onChange={handleDishesPerPageChange}
                        itemName={t('dishes')}
                    />
                    <TextInput
                        placeholder={t('Search dishes')}
                        className="w-64 dark:!bg-gray-800 placeholder:text-gray-600 dark:placeholder:text-gray-400"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                {filteredDishes.length > 0 ? (
                    <>
                        <Table
                            data={currentDishes}
                            columns={dishesColumns}
                            sortColumn={sortColumn}
                            sortDirection={sortDirection}
                            handleSort={handleSort}
                            actionsRenderer={renderDishesActions}
                        />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(filteredDishes.length / dishesPerPage)}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <div className="p-4 sm:p-8 text-center bg-white dark:bg-gray-800 shadow sm:rounded-lg transition ease-linear duration-300">
                        <p className="text-gray-900 dark:text-gray-100">{t('No dishes found.')}</p>
                    </div>
                )}
            </div>
        </CR_AppAdminLayout>
    );
}