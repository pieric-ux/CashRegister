import { useState } from "react";
import CR_AppAdminLayout from "@/Layouts/CR_AppAdminLayout";
import { Head } from "@inertiajs/react";
import CreateEmployeeForm from "./Partials/CreateEmployeeForm";
import UpdateEmployeeForm from "./Partials/UpdateEmployeeForm";
import DeleteEmployeeForm from "./Partials/DeleteEmployeeForm";
import RegenerateEmployeeForm from "./Partials/RegenerateEmployeeForm";
import TextInput from "@/Components/TextInput";
import Table from "@/Components/Table";
import { sortData, filterData } from "@/Utils/useTableUtils";
import Pagination from "@/Components/Pagination";
import PaginationItemsPerPage from "@/Components/PaginationItemsPerPage";
import { useTranslation } from "react-i18next";

export default function Index({
    customerAuth,
    application,
    employees,
    localization,
}) {
    const { t } = useTranslation();

    {
        /* State variables for handling search, sorting, and pagination */
    }
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState("");
    const [sortDirection, setSortDirection] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage, setEmployeesPerPage] = useState(10);

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
    const handleEmployeesPerPageChange = (e) => {
        setEmployeesPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1);
    };

    {
        /* Columns configuration for the table */
    }
    const employeeColumns = [
        { key: "first_name", label: t("First Name") },
        {
            key: "last_name",
            label: t("Last Name"),
            className: "hidden md:table-cell",
        },
        { key: "phone", label: t("Phone"), className: "hidden xl:table-cell" },
        { key: "email", label: t("Email"), className: "hidden lg:table-cell" },
    ];

    {
        /* Configuration for rendering actions in each row */
    }
    const renderEmployeeActions = {
        header: () => t("Actions"),
        render: (employee) => (
            <div className="flex items-center justify-center gap-2">
                <RegenerateEmployeeForm employee={employee} />
                <UpdateEmployeeForm employee={employee} />
                <DeleteEmployeeForm employee={employee} />
            </div>
        ),
    };

    {
        /* Applying sorting and filtering */
    }
    const sortedEmployees = sortData(employees, sortColumn, sortDirection);
    const filteredEmployees = filterData(
        sortedEmployees,
        searchTerm,
        employeeColumns,
    );

    {
        /* Pagination calculation */
    }
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(
        indexOfFirstEmployee,
        indexOfLastEmployee,
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
                    <CreateEmployeeForm
                        className="mx-auto max-w-xl"
                        application={application}
                    />
                </div>
                <div className="mt-4 flex flex-col items-center justify-end gap-2 pr-4 sm:flex-row">
                    <PaginationItemsPerPage
                        itemsPerPage={employeesPerPage}
                        onChange={handleEmployeesPerPageChange}
                        itemName={t("employees")}
                    />
                    <TextInput
                        placeholder={t("Search employees")}
                        className="w-64 placeholder:text-gray-600 dark:!bg-gray-800 dark:placeholder:text-gray-400"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                {filteredEmployees.length > 0 ? (
                    <>
                        <Table
                            data={currentEmployees}
                            columns={employeeColumns}
                            sortColumn={sortColumn}
                            sortDirection={sortDirection}
                            handleSort={handleSort}
                            actionsRenderer={renderEmployeeActions}
                        />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(
                                filteredEmployees.length / employeesPerPage,
                            )}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <div className="bg-white p-4 text-center shadow transition duration-300 ease-linear dark:bg-gray-800 sm:rounded-lg sm:p-8">
                        <p className="text-gray-900 dark:text-gray-100">
                            {t("No employees found.")}
                        </p>
                    </div>
                )}
            </div>
        </CR_AppAdminLayout>
    );
}
