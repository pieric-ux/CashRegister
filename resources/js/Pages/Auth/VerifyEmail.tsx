import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import GuestLayout from '@/Components/layouts/Guest/GuestLayout';
import VerifyEmailForm from '@/Components/forms/Auth/VerifyEmailForm';
import { Alert, AlertDescription } from '@/Components/ui/alert/alert';
import { CardContent, CardDescription } from '@/Components/ui/card/card';

interface VerifyEmailProps {
    status: string;
}

export default function VerifyEmail({ status }: VerifyEmailProps): JSX.Element {
    const { t } = useTranslation();

    return (
        <GuestLayout>
            <Head title={t('Email Verification')} />

            <CardContent>
                {status && (
                    <>
                        <Alert className='mb-4' variant={'success'}>
                            <AlertDescription>{t(status)}</AlertDescription>
                        </Alert>
                    </>
                )}
                <CardDescription>
                    {t(
                        "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.",
                    )}
                </CardDescription>
                <VerifyEmailForm />
            </CardContent>
        </GuestLayout>
    );
}
