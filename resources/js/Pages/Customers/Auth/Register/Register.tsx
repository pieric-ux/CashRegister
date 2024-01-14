import { useTranslation } from 'react-i18next';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import ApplicationLogo from '@/Components/ApplicationLogo';
import ApplicationLogoDark from '@/Components/ApplicationLogoDark';
import { Card, CardContent, CardHeader } from '@/Components/ui/card/card';
import { RegisterForm } from '@/Pages/Customers/Auth/Register/Components/RegisterForm';

export default function Register(): JSX.Element {
    const { t } = useTranslation();

    return (
        <GuestLayout>
            <Head title={t('Register')} />

            <Card className='w-full sm:max-w-md'>
                <CardHeader>
                    <Link href='/'>
                        <ApplicationLogo className='m-auto block dark:hidden' />
                        <ApplicationLogoDark className='m-auto hidden dark:block' />
                    </Link>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                </CardContent>
            </Card>
        </GuestLayout>
    );
}
