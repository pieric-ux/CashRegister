import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { CardContent } from '@/Components/ui/card/card';
import { LoginForm } from '@/Components/forms/Auth/LoginForm';
import GuestLayout from '@/Components/layouts/Guest/GuestLayout';
import { Alert, AlertDescription } from '@/Components/ui/alert/alert';

export default function Login({
    status,
    canResetPassword,
}: {
    status: string;
    canResetPassword: boolean;
}): JSX.Element {
    const { t } = useTranslation();

    return (
        <GuestLayout>
            <Head title={t('Log in')} />

            <CardContent>
                {status != null && (
                    <>
                        <Alert className='mb-4' variant={'success'}>
                            <AlertDescription>{t(status)}</AlertDescription>
                        </Alert>
                    </>
                )}
                <LoginForm canResetPassword={canResetPassword} />
            </CardContent>
        </GuestLayout>
    );
}
