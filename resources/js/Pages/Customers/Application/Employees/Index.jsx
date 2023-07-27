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

export default function Index({ customerAuth, application, employees, GlobalTranslations, translations }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState("");
    const [sortDirection, setSortDirection] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage, setEmployeesPerPage] = useState(10);

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

    const handleEmployeesPerPageChange = (e) => {
        setEmployeesPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1);
    };

    const employeeColumns = [
        { key: "first_name", label: translations.inputFirstNameLabel },
        { key: "last_name", label: translations.inputLastNameLabel, className: "hidden md:table-cell" },
        { key: "phone", label: translations.inputPhoneLabel, className: "hidden xl:table-cell" },
        { key: "email", label: translations.inputEmailLabel, className: "hidden lg:table-cell" },
    ];

    const renderEmployeeActions = {
        header: () => translations.headerActionsTable,
        render: (employee) => (
            <div className="flex items-center justify-center gap-2">
                <RegenerateEmployeeForm employee={employee} translations={translations} />
                <UpdateEmployeeForm employee={employee} translations={translations} />
                <DeleteEmployeeForm employee={employee} translations={translations} />
            </div>
        )
    };

    const sortedEmployees = sortData(employees, sortColumn, sortDirection);
    const filteredEmployees = filterData(sortedEmployees, searchTerm, employeeColumns);

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);


    return (
        <CR_AppAdminLayout auth={customerAuth} application={application} GlobalTranslations={GlobalTranslations}>
            <Head title={application.name} />
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg transition ease-linear duration-300">
                    <CreateEmployeeForm className="max-w-xl mx-auto" application={application} translations={translations} />
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-end pr-4 mt-4 gap-2">
                    <PaginationItemsPerPage
                        itemsPerPage={employeesPerPage}
                        onChange={handleEmployeesPerPageChange}
                        itemName={translations.paginationItemsName}
                    />
                    <TextInput
                        placeholder={translations.inputSearchPlaceholder}
                        className="w-64 dark:!bg-gray-800 placeholder:text-gray-600 dark:placeholder:text-gray-400"
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
                            totalPages={Math.ceil(filteredEmployees.length / employeesPerPage)}
                            onPageChange={handlePageChange}
                            translations={translations}
                        />
                    </>
                ) : (
                    <div className="p-4 sm:p-8 text-center bg-white dark:bg-gray-800 shadow sm:rounded-lg transition ease-linear duration-300">
                        <p className="text-gray-900 dark:text-gray-100">{translations.noEmployeeFound}</p>
                    </div>
                )}
            </div>
        </CR_AppAdminLayout>
    );
}