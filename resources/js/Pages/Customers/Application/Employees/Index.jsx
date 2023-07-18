import { useState } from "react";
import CR_AppAdminLayout from "@/Layouts/CR_AppAdminLayout";
import { Head } from "@inertiajs/react";
import CreateEmployeeForm from "./Partials/CreateEmployeeForm";
import UpdateEmployeeForm from "./Partials/UpdateEmployeeForm";
import DeleteEmployeeForm from "./Partials/DeleteEmployeeForm";
import RegenerateEmployeeForm from "./Partials/RegenerateEmployeeForm";
import TextInput from "@/Components/TextInput";

export default function Index({ customerAuth, application, employees }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState("");
    const [sortDirection, setSortDirection] = useState("");

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

    const sortedEmployees = employees.sort((a, b) => {
        if (sortColumn) {
            const valueA = a[sortColumn] ? a[sortColumn].toLowerCase() : "";
            const valueB = b[sortColumn] ? b[sortColumn].toLowerCase() : "";
            if (valueA < valueB) {
                return sortDirection === "asc" ? -1 : 1;
            }
            if (valueA > valueB) {
                return sortDirection === "asc" ? 1 : -1;
            }
        }
        return 0;
    });

    const filteredEmployees = sortedEmployees.filter((employee) => {
        const firstNameMatch = employee.first_name && employee.first_name.toLowerCase().includes(searchTerm.toLowerCase());
        const lastNameMatch = employee.last_name && employee.last_name.toLowerCase().includes(searchTerm.toLowerCase());
        const phoneMatch = employee.phone && employee.phone.toLowerCase().includes(searchTerm.toLowerCase());
        const emailMatch = employee.email && employee.email.toLowerCase().includes(searchTerm.toLowerCase());

        return firstNameMatch || lastNameMatch || phoneMatch || emailMatch;
    });

    return (
        <CR_AppAdminLayout auth={customerAuth} application={application}>
            <Head title={application.name} />
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg transition ease-linear duration-300">
                    <CreateEmployeeForm className="max-w-xl mx-auto" application={application} />
                </div>
                <div className="flex justify-end pr-4 mt-4">
                    <TextInput
                        placeholder="Search employees"
                        className="w-64 dark:!bg-gray-800 placeholder:text-gray-600 dark:placeholder:text-gray-400"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                {filteredEmployees.length > 0 ? (

                    <table className="min-w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md rounded-lg transition ease-linear duration-300">
                        <thead>
                            <tr>
                                <th
                                    className="py-2 px-4 text-left cursor-pointer"
                                    onClick={() => handleSort("first_name")}
                                >
                                    First Name
                                </th>
                                <th
                                    className="hidden md:table-cell py-2 px-4 text-left cursor-pointer"
                                    onClick={() => handleSort("last_name")}
                                >
                                    Last Name
                                </th>
                                <th
                                    className="hidden xl:table-cell py-2 px-4 text-left cursor-pointer"
                                    onClick={() => handleSort("phone")}
                                >
                                    Phone
                                </th>
                                <th
                                    className="hidden lg:table-cell py-2 px-4 text-left cursor-pointer"
                                    onClick={() => handleSort("email")}
                                >
                                    Email
                                </th>
                                <th className="py-2 px-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map((employee) => (
                                <tr key={employee.id}>
                                    <td className="py-2 px-4 border-t border-gray-300 dark:border-gray-700">
                                        {employee.first_name}
                                    </td>
                                    <td className="hidden md:table-cell py-2 px-4 border-t border-gray-300 dark:border-gray-700">
                                        {employee.last_name}
                                    </td>
                                    <td className="hidden xl:table-cell py-2 px-4 border-t border-gray-300 dark:border-gray-700">
                                        {employee.phone}
                                    </td>
                                    <td className="hidden lg:table-cell py-2 px-4 border-t border-gray-300 dark:border-gray-700">
                                        {employee.email}
                                    </td>
                                    <td className="py-2 px-4 border-t border-gray-300 dark:border-gray-700">
                                        <div className="flex items-center justify-center gap-2">
                                            <RegenerateEmployeeForm employee={employee} />
                                            <UpdateEmployeeForm employee={employee} />
                                            <DeleteEmployeeForm employee={employee} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                ) : (
                    <div className="p-4 sm:p-8 text-center bg-white dark:bg-gray-800 shadow sm:rounded-lg transition ease-linear duration-300">
                        <p className="text-gray-900 dark:text-gray-100">No employees found.</p>
                    </div>
                )}
            </div>
        </CR_AppAdminLayout>
    );
}