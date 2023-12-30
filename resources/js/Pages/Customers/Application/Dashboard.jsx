import CR_AppAdminLayout from '@/Layouts/CR_AppAdminLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ customerAuth, application, localization }) {
    return (
        <CR_AppAdminLayout
            auth={customerAuth}
            application={application}
            localization={localization}
        >
            <Head title={application.name} />

            <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
                <div className='overflow-hidden bg-white shadow-sm transition duration-300 ease-linear sm:rounded-lg dark:bg-gray-800'>
                    <div className='p-6 text-gray-900 dark:text-gray-100'>{application.name}</div>
                </div>
            </div>
        </CR_AppAdminLayout>
    );
}
