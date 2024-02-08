import { useTranslation } from 'react-i18next';
import LoginCustomer from './Auth/LoginCustomer';
import RegisterCustomer from './Auth/RegisterCustomer';
import { Link, Head, usePage } from '@inertiajs/react';
import { CardContent } from '@/Components/ui/card/cardContent';
import { TabsContent } from '@/Components/ui/tabs/tabsContent';
import GuestLayout from '@/Components/layouts/Guest/GuestLayout';
import { Tabs, TabsList, TabsTrigger } from '@/Components/ui/tabs/tabs';

interface LoginProps {
    status: string;
    canResetPassword: boolean;
}
export default function Welcome({ status, canResetPassword }: LoginProps): JSX.Element {
    const { t } = useTranslation();
    const { customer } = usePage<InertiaPageProps>().props;

    return (
        <GuestLayout>
            <Head title='Welcome' />
            <div className='p-6 text-right sm:fixed sm:right-0 sm:top-0'>
                {customer !== undefined && customer !== null && (
                    <Link
                        href={route('dashboard')}
                        className='font-semibold text-muted-foreground hover:text-muted focus:rounded-sm focus:outline focus:outline-2 focus:outline-ring'
                    >
                        {t('Dashboard')}
                    </Link>
                )}
            </div>
            <CardContent>
                <Tabs defaultValue='login' className='space-y-4'>
                    <TabsList className='grid w-full grid-cols-2'>
                        <TabsTrigger value='login'>{t('Login')}</TabsTrigger>
                        <TabsTrigger value='register'>{t('Register')}</TabsTrigger>
                    </TabsList>
                    <TabsContent value='login'>
                        <LoginCustomer status={status} canResetPassword={canResetPassword} />
                    </TabsContent>
                    <TabsContent value='register'>
                        <RegisterCustomer />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </GuestLayout>
    );
}
