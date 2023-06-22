import CustomerLayout from '@/Layouts/CustomerLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import UpdateUserAvatar from './Partials/UpdateUserAvatar';

export default function Edit({ auth, mustVerifyEmail, status }) {

    return (
        <CustomerLayout
            customer={auth.customer}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg transition ease-linear duration-300">
                    <UpdateUserAvatar className="max-w-xl mx-auto" avatarPath={auth.customer.avatar} />

                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl mt-6 mx-auto"
                        customer={auth.customer}
                    />
                </div>
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg transition ease-linear duration-300">
                    <UpdatePasswordForm className="max-w-xl mx-auto" />
                </div>

                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg transition ease-linear duration-300">
                    <DeleteUserForm className="max-w-xl mx-auto" />
                </div>
            </div>
        </CustomerLayout>
    );
}
