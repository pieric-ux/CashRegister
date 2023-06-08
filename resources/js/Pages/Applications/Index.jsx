import { Link } from '@inertiajs/react';
import CustomerLayout from '@/Layouts/CustomerLayout';
import { Head } from '@inertiajs/react';

export default function Index({ applications, auth }) {
    return (
        <CustomerLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Applications</h2>}
        >
            <Head title="Applications" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg transition ease-linear duration-300">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <Link href={route('applications.create')}>
                            + Créer une application +
                        </Link>
                    </div>
                </div>
                <h1 className='mt-4'>Liste des applications</h1>
                {applications.length > 0 ? (
                    <ul>
                        {applications.map((application) => (
                            <li className='my-4' key={application.id}>
                                <Link href={route('applications.show', application.slug)}>
                                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg transition ease-linear duration-300">
                                        <div className="p-6 text-gray-900 dark:text-gray-100">
                                            {application.name}
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucune application trouvée.</p>
                )}

            </div>

        </CustomerLayout >
    );
};
