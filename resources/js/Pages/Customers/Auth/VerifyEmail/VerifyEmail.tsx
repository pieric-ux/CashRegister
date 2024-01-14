import { useTranslation } from 'react-i18next';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import ApplicationLogoDark from '@/Components/ApplicationLogoDark';
import { Alert, AlertDescription } from '@/Components/ui/alert/alert';
import { Card, CardContent, CardDescription, CardHeader } from '@/Components/ui/card/card';
import { VerifyEmailForm } from './Components/VerifyEmailForm';

export default function VerifyEmail({ status }: { status: string }): JSX.Element {
    const { t } = useTranslation();

    return (
        <GuestLayout>
            <Head title={t('Email Verification')} />

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
                            "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.",
                        )}
                    </CardDescription>
                    <VerifyEmailForm />
                </CardContent>
            </Card>
        </GuestLayout>
    );
}
