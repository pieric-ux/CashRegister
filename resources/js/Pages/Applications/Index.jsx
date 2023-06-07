import { Link } from '@inertiajs/react';
import CustomerLayout from '@/Layouts/CustomerLayout';

export default function Index({ applications, auth }) {
    return (
        <CustomerLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Applications</h2>}
        >
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg transition ease-linear duration-300">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <h1>Liste des applications</h1>
                        {applications.length > 0 ? (
                            <ul>
                                {applications.map((application) => (
                                    <li key={application.id}>
                                        <Link href={route('applications.show', application.id)}>
                                            {application.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Aucune application trouvée.</p>
                        )}
                    </div>
                </div>
            </div>

        </CustomerLayout >
    );
};
