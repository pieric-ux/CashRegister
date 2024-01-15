import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import DeleteUser from '@/Pages/Customers/Profile/Components/DeleteUser';
import CustomerLayout from '@/Components/layouts/Auth/Customer/CustomerLayout';
import UpdatePassword from '@/Pages/Customers/Profile/Components/UpdatePassword';
import UpdateUserAvatar from '@/Components/features/update-user-avatar/UpdateUserAvatar';
import UpdateProfileInformation from '@/Pages/Customers/Profile/Components/UpdateProfileInformation';

export default function Edit({
    customerAuth,
    mustVerifyEmail,
    status,
    localization,
}: {
    mustVerifyEmail: boolean;
    status: string;
}): JSX.Element {
    const { t } = useTranslation();

    return (
        <CustomerLayout auth={customerAuth} localization={localization}>
            <Head title={t('Profile')} />

            <div className='mx-auto max-w-7xl space-y-6 px-2 sm:px-6 lg:px-8'>
                <UpdateUserAvatar avatarPath={customerAuth.avatarPath} />

                <UpdateProfileInformation
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                    customer={customerAuth.customer}
                />

                <UpdatePassword />

                <DeleteUser />
            </div>
        </CustomerLayout>
    );
}
