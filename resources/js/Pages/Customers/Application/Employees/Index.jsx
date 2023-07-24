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

export default function Index({ customerAuth, application, employees }) {
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
        { key: "first_name", label: "First Name" },
        { key: "last_name", label: "Last Name", className: "hidden md:table-cell" },
        { key: "phone", label: "Phone", className: "hidden xl:table-cell" },
        { key: "email", label: "Email", className: "hidden lg:table-cell" },
    ];

    const renderEmployeeActions = (employee) => (
        <div className="flex items-center justify-center gap-2">
            <RegenerateEmployeeForm employee={employee} />
            <UpdateEmployeeForm employee={employee} />
            <DeleteEmployeeForm employee={employee} />
        </div>
    );

    const sortedEmployees = sortData(employees, sortColumn, sortDirection);
    const filteredEmployees = filterData(sortedEmployees, searchTerm, employeeColumns);

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);


    return (
        <CR_AppAdminLayout auth={customerAuth} application={application}>
            <Head title={application.name} />
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg transition ease-linear duration-300">
                    <CreateEmployeeForm className="max-w-xl mx-auto" application={application} />
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-end pr-4 mt-4 gap-2">
                    <PaginationItemsPerPage
                        itemsPerPage={employeesPerPage}
                        onChange={handleEmployeesPerPageChange}
                    />
                    <TextInput
                        placeholder="Search employees"
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
                        />
                    </>
                ) : (
                    <div className="p-4 sm:p-8 text-center bg-white dark:bg-gray-800 shadow sm:rounded-lg transition ease-linear duration-300">
                        <p className="text-gray-900 dark:text-gray-100">No employees found.</p>
                    </div>
                )}
            </div>
        </CR_AppAdminLayout>
    );
}