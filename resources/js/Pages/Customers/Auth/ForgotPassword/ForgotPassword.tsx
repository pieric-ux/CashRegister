import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import GuestLayout from '@/Layouts/GuestLayout';
import ApplicationLogo from '@/Components/ApplicationLogo';
import ApplicationLogoDark from '@/Components/ApplicationLogoDark';
import { Alert, AlertDescription } from '@/Components/ui/alert/alert';
import { Card, CardContent, CardDescription, CardHeader } from '@/Components/ui/card/card';
import { ForgotPasswordForm } from '@/Pages/Customers/Auth/ForgotPassword/Components/ForgotPasswordForm';

export default function ForgotPassword({ status }: { status: string }): JSX.Element {
    const { t } = useTranslation();

    return (
        <GuestLayout>
            <Head title={t('Forgot Password')} />

            <Card className='w-full sm:max-w-md'>
                <CardHeader className='space-y-6'>
                    <Link href='/'>
                        <ApplicationLogo className='m-auto block dark:hidden' />
                        <ApplicationLogoDark className='m-auto hidden dark:block' />
                    </Link>
                    {status != null && (
                        <>
                            <Alert variant={'success'}>
                                <AlertDescription>{t(status)}</AlertDescription>
                            </Alert>
                        </>
                    )}
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        {t(
                            'Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.',
                        )}
                    </CardDescription>
                    <ForgotPasswordForm />
                </CardContent>
            </Card>
        </GuestLayout>
    );
}
