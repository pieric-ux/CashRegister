import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import GuestLayout from '@/Components/layouts/Guest/GuestLayout';
import { Alert, AlertDescription } from '@/Components/ui/alert/alert';
import { CardContent, CardDescription } from '@/Components/ui/card/card';
import ForgotPasswordForm from '@/Components/forms/Auth/ForgotPasswordForm';

interface ForgotPasswordProps {
    status: string;
}

export default function ForgotPassword({ status }: ForgotPasswordProps): JSX.Element {
    const { t } = useTranslation();

    return (
        <GuestLayout>
            <Head title={t('Forgot Password')} />

            <CardContent>
                {status != null && (
                    <>
                        <Alert className='mb-4' variant={'success'}>
                            <AlertDescription>{t(status)}</AlertDescription>
                        </Alert>
                    </>
                )}
                <CardDescription>
                    {t(
                        'Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.',
                    )}
                </CardDescription>
                <ForgotPasswordForm />
            </CardContent>
        </GuestLayout>
    );
}
