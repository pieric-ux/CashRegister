import CR_AppAdminLayout from "@/Layouts/CR_AppAdminLayout";
import { Head } from "@inertiajs/react";
import CreateEmployeeForm from "./Partials/CreateEmployeeForm";
import UpdateEmployeeForm from "./Partials/UpdateEmployeeForm";
import DeleteEmployeeForm from "./Partials/DeleteEmployeeForm";
import RegenerateEmployeeForm from "./Partials/RegenerateEmployeeForm";

export default function Index({ customerAuth, application, employees }) {
    return (
        <CR_AppAdminLayout
            auth={customerAuth}
            application={application}
        >
            <Head title={application.name} />
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg transition ease-linear duration-300">
                    <CreateEmployeeForm className="max-w-xl mx-auto" application={application} />
                </div>
                {employees.length > 0 ? (
                    <ul>
                        {employees.map((employee) => (
                            <li className="my-4" key={employee.id}>
                                <div className="relative flex md:flex-row lg:gap-12 md:gap-10 flex-col sm:p-8 p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md rounded-lg transition ease-linear duration-300">
                                    <div className='absolute top-4 right-4 flex gap-2'>
                                        <RegenerateEmployeeForm employee={employee} />
                                        <UpdateEmployeeForm employee={employee} />
                                        <DeleteEmployeeForm employee={employee} />
                                    </div>
                                    <div className="flex flex-col flex-1 gap-2">
                                        <p className='text-gray-900 dark:text-gray-100 text-clip overflow-hidden'>{employee.first_name}</p>
                                        <p className='text-gray-900 dark:text-gray-100 text-clip overflow-hidden'>{employee.last_name}</p>
                                        <p className='text-gray-900 dark:text-gray-100 text-clip overflow-hidden'>{employee.phone}</p>
                                        <p className='text-gray-900 dark:text-gray-100 text-clip overflow-hidden'>{employee.email}</p>
                                    </div>

                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="p-4 sm:p-8 text-center bg-white dark:bg-gray-800 shadow sm:rounded-lg transition ease-linear duration-300">
                        <p className='text-gray-900 dark:text-gray-100'>No employees found.</p>
                    </div>
                )}
            </div>
        </CR_AppAdminLayout>
    )
}