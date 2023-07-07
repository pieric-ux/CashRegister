import CustomerLayout from '@/Layouts/CustomerLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ customerAuth }) {
    return (
        <CustomerLayout auth={customerAuth}>
            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg transition ease-linear duration-300">
                    <p className="text-gray-900 dark:text-gray-100">You're logged in!</p>
                </div>
            </div>

        </CustomerLayout>
    );
}
