import CustomerLayout from '@/Layouts/CustomerLayout';
import { Head } from '@inertiajs/react';

export default function Show({ application, auth }) {
    return (
        <CustomerLayout
            user={auth.customer}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{application.name}</h2>}
        >
            <Head title={application.name} />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg transition ease-linear duration-300">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        {application.name}
                    </div>
                </div>
            </div>
        </CustomerLayout>
    );
};