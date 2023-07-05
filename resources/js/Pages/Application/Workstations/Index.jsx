import CR_AppAdminLayout from "@/Layouts/CR_AppAdminLayout";
import { Head, Link } from "@inertiajs/react";
import CreateWorkstationForm from "./Partials/CreateWorkstationForm";
import PrimaryButton from "@/Components/PrimaryButton";
import DeleteWorkstationForm from "./Partials/DeleteWorstationForm";
import UpdateWorkstationForm from "./Partials/UpdateWorkstationForm";

export default function Index({ application, auth, workstations }) {
    return (
        <CR_AppAdminLayout
            auth={auth}
            application={application}
        >
            <Head title={application.name} />
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg transition ease-linear duration-300">
                    <CreateWorkstationForm className="max-w-xl mx-auto" application={application} />
                </div>
                {workstations.length > 0 ? (
                    <ul>
                        {workstations.map((workstation) => (
                            <li className="my-4" key={workstation.id}>
                                <div className="relative flex md:flex-row lg:gap-12 md:gap-10 flex-col sm:p-8 p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md rounded-lg transition ease-linear duration-300">
                                    <div className='absolute top-4 right-4 flex gap-2'>
                                        <UpdateWorkstationForm workstation={workstation} />
                                        <DeleteWorkstationForm workstation={workstation} />
                                    </div>
                                    {workstation.name}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="p-4 sm:p-8 text-center bg-white dark:bg-gray-800 shadow sm:rounded-lg transition ease-linear duration-300">
                        <p className='text-gray-900 dark:text-gray-100'>No workstation found.</p>
                    </div>
                )}
            </div>
        </CR_AppAdminLayout>
    )
}