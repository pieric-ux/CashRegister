import { useTranslation } from 'react-i18next';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import ApplicationLogoDark from '@/Components/ApplicationLogoDark';
import { ConfirmPasswordForm } from './Components/ConfirmPasswordForm';
import { Card, CardContent, CardDescription, CardHeader } from '@/Components/ui/card/card';

export default function ConfirmPassword(): JSX.Element {
    const { t } = useTranslation();

    return (
        <GuestLayout>
            <Head title={t('Confirm Password')} />

            <Card className='w-full sm:max-w-md'>
                <CardHeader>
                    <Link href='/'>
                        <ApplicationLogo className='m-auto block dark:hidden' />
                        <ApplicationLogoDark className='m-auto hidden dark:block' />
                    </Link>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        {t(
                            'This is a secure area of the application. Please confirm your password before continuing.',
                        )}
                    </CardDescription>
                    <ConfirmPasswordForm />
                </CardContent>
            </Card>
        </GuestLayout>
    );
}
