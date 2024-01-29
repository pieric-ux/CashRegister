import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import DeleteUser from './Components/DeleteUser';
import UpdatePassword from './Components/UpdatePassword';
import UpdateUserAvatar from './Components/UpdateUserAvatar';
import UpdateProfileInformation from './Components/UpdateProfileInformation';
import CustomerLayout from '@/Components/layouts/Auth/Customer/CustomerLayout';

interface EditProfileProps {
    mustVerifyEmail: boolean;
    status: string;
}

export default function Edit({ mustVerifyEmail, status }: EditProfileProps): JSX.Element {
    const { t } = useTranslation();

    return (
        <CustomerLayout>
            <Head title={t('Profile')} />

            <UpdateUserAvatar />

            <UpdateProfileInformation mustVerifyEmail={mustVerifyEmail} status={status} />

            <UpdatePassword />

            <DeleteUser />
        </CustomerLayout>
    );
}
