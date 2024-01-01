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

            <div className='mx-auto max-w-7xl space-y-6 px-2 sm:px-6 lg:px-8'>
                <div className='rounded-lg bg-white p-4 shadow-md transition duration-300 ease-linear sm:p-8 dark:bg-gray-800'>
                    <UpdateUserAvatar
                        className='mx-auto max-w-xl'
                        avatarPath={customerAuth.avatarPath}
                    />

                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className='mx-auto mt-6 max-w-xl'
                        customer={customerAuth.customer}
                    />
                </div>
                <div className='rounded-lg bg-white p-4 shadow-md transition duration-300 ease-linear sm:p-8 dark:bg-gray-800'>
                    <UpdatePasswordForm className='mx-auto max-w-xl' />
                </div>

                <div className='rounded-lg bg-white p-4 shadow-md transition duration-300 ease-linear sm:p-8 dark:bg-gray-800'>
                    <DeleteUserForm className='mx-auto max-w-xl' />
                </div>
            </div>
        </CustomerLayout>
    );
}