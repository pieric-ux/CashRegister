import { useTranslation } from 'react-i18next';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import ApplicationLogoDark from '@/Components/ApplicationLogoDark';
import { Alert, AlertDescription } from '@/Components/ui/alert/alert';
import { Card, CardContent, CardHeader } from '@/Components/ui/card/card';
import { LoginForm } from './Components/LoginForm';

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
                    <LoginForm canResetPassword={canResetPassword} />
                </CardContent>
            </Card>
        </GuestLayout>
    );
}
