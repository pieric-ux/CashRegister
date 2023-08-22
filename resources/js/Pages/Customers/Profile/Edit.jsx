import CustomerLayout from '@/Layouts/CustomerLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import UpdateUserAvatar from './Partials/UpdateUserAvatar';
import { useTranslation } from 'react-i18next';

export default function Edit({ customerAuth, mustVerifyEmail, status, localization }) {
    const { t } = useTranslation();

    return (
        <CustomerLayout auth={customerAuth} localization={localization}>
            <Head title={t('Profile')} />

            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg transition ease-linear duration-300">
                    <UpdateUserAvatar className="max-w-xl mx-auto" avatarPath={customerAuth.avatarPath} />

                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl mt-6 mx-auto"
                        customer={customerAuth.customer}
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
