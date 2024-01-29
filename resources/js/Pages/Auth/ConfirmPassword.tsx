import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import GuestLayout from '@/Components/layouts/Guest/GuestLayout';
import { CardContent, CardDescription } from '@/Components/ui/card/card';
import ConfirmPasswordForm from '@/Components/forms/Auth/ConfirmPasswordForm';

export default function ConfirmPassword(): JSX.Element {
    const { t } = useTranslation();

    return (
        <GuestLayout>
            <Head title={t('Confirm Password')} />

            <CardContent>
                <CardDescription>
                    {t(
                        'This is a secure area of the application. Please confirm your password before continuing.',
                    )}
                </CardDescription>
                <ConfirmPasswordForm />
            </CardContent>
        </GuestLayout>
    );
}
