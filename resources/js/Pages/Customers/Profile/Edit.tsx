import { useTranslation } from 'react-i18next';
import { Head, usePage } from '@inertiajs/react';
import DeleteUser from './Components/DeleteUser';
import UpdatePassword from './Components/UpdatePassword';
import UpdateUserAvatar from '@/Components/generic/UpdateUserAvatar';
import UpdateProfileInformation from './Components/UpdateProfileInformation';
import CustomerLayout from '@/Components/layouts/Auth/Customer/CustomerLayout';

export default function Edit(): JSX.Element {
    const { t } = useTranslation();
    const { customer } = usePage<InertiaPageProps>().props;
    const avatarPath = customer.media.find(
        ({ collection_name }) => collection_name === 'avatars',
    )?.original_url;

    return (
        <CustomerLayout>
            <Head title={t('Profile')} />

            <UpdateUserAvatar avatarPath={avatarPath} />

            <UpdateProfileInformation />

            <UpdatePassword />

            <DeleteUser />
        </CustomerLayout>
    );
}
