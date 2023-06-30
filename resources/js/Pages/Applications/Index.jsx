import { Head } from '@inertiajs/react';
import CustomerLayout from '@/Layouts/CustomerLayout';
import CreateAppForm from './Partials/CreateAppForm';
import UpdateAppForm from './Partials/UpdateAppForm';
import DeleteAppForm from './Partials/DeleteAppForm';
import UpdateAppPoster from './Partials/UpdateAppPoster';

export default function Index({ applications, auth }) {

    return (
        <CustomerLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Applications</h2>}
        >
            <Head title="Applications" />

            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg transition ease-linear duration-300">
                    <CreateAppForm className="max-w-xl mx-auto" />
                </div>

                {applications.length > 0 ? (
                    <ul>
                        {applications.map((application) => (
                            <li className='my-4' key={application.id}>
                                <div className="flex gap-8 p-4 sm:p-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md rounded-lg transition ease-linear duration-300">
                                    {/*<Link className='flex gap-4 flex-1' href={route('applications.show', application.slug)}></Link>*/}
                                    <div className='flex items-center'>
                                        <UpdateAppPoster application={application} />
                                    </div>
                                    <div className='flex flex-col flex-1'>
                                        <div className='flex gap-2 justify-end'>
                                            <UpdateAppForm application={application} />
                                            <DeleteAppForm application={application} />
                                        </div>
                                        <div className='flex flex-col flex-1 gap-2 mt-1'>
                                            <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>{application.name}</h2>
                                            <p className='text-gray-900 dark:text-gray-100'>{application.description}</p>
                                            <div className='flex flex-wrap gap-4'>
                                                <p className='text-gray-900 dark:text-gray-100'>{application.start_date}</p>
                                                <p className='text-gray-900 dark:text-gray-100'>{application.end_date}</p>
                                            </div>
                                            <p className='text-gray-900 dark:text-gray-100'>{application.location}</p>
                                            <p className='text-gray-900 dark:text-gray-100'>{application.website}</p>
                                        </div>
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
