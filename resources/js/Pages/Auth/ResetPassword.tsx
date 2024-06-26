import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { CardContent } from '@/Components/ui/card/card';
import GuestLayout from '@/Components/layouts/Guest/GuestLayout';
import ResetPasswordForm from '@/Components/forms/Auth/ResetPasswordForm';

export default function ResetPassword(): JSX.Element {
    const { t } = useTranslation();

    return (
        <GuestLayout>
            <Head title={t('Reset Password')} />

            <CardContent>
                <ResetPasswordForm />
            </CardContent>
        </GuestLayout>
    );
}
