import { useTranslation } from 'react-i18next';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import ApplicationLogoDark from '@/Components/ApplicationLogoDark';
import { Card, CardContent, CardHeader } from '@/Components/ui/card/card';
import { ResetPasswordForm } from '@/Pages/Customers/Auth/ResetPassword/Components/ResetPasswordForm';

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}): JSX.Element {
    const { t } = useTranslation();

    return (
        <GuestLayout>
            <Head title={t('Reset Password')} />
            <Card className='w-full sm:max-w-md'>
                <CardHeader>
                    <Link href='/'>
                        <ApplicationLogo className='m-auto block dark:hidden' />
                        <ApplicationLogoDark className='m-auto hidden dark:block' />
                    </Link>
                </CardHeader>
                <CardContent>
                    <ResetPasswordForm token={token} email={email} />
                </CardContent>
            </Card>
        </GuestLayout>
    );
}
