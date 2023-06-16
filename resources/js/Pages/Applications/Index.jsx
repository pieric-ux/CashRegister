import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import CustomerLayout from '@/Layouts/CustomerLayout';
import CreateAppForm from './Partials/CreateAppForm';
import UpdateAppForm from './Partials/UpdateAppForm';
import DeleteAppForm from './Partials/DeleteAppForm';

export default function Index({ applications, auth }) {

    return (
        <CustomerLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Applications</h2>}
        >
            <Head title="Applications" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg transition ease-linear duration-300">
                    <CreateAppForm className="max-w-xl mx-auto" />
                </div>

                {applications.length > 0 ? (
                    <ul>
                        {applications.map((application) => (
                            <li className='my-4' key={application.id}>
                                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg transition ease-linear duration-300">
                                    <div className="flex gap-4 p-6 text-gray-900 dark:text-gray-100">
                                        {application.name}
                                        <Link href={route('applications.show', application.slug)}>Show</Link>
                                        <UpdateAppForm application={application} />
                                        <DeleteAppForm application={application} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="p-4 sm:p-8 text-center bg-white dark:bg-gray-800 shadow sm:rounded-lg transition ease-linear duration-300">
                        <p className='text-gray-900 dark:text-gray-100'>No application found.</p>
                    </div>
                )}

            </div>

        </CustomerLayout >
    );
};
