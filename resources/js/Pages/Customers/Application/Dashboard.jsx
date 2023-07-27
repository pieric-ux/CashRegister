import CR_AppAdminLayout from '@/Layouts/CR_AppAdminLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ customerAuth, application, GlobalTranslations }) {
    return (
        <CR_AppAdminLayout
            auth={customerAuth}
            application={application}
            GlobalTranslations={GlobalTranslations}
        >
            <Head title={application.name} />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg transition ease-linear duration-300">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        {application.name}
                    </div>
                </div>
            </div>
        </CR_AppAdminLayout>
    );
};