import CustomerLayout from '@/Layouts/CustomerLayout';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Dashboard({ customerAuth, localization }) {
    const { t } = useTranslation();

    return (
        <CustomerLayout auth={customerAuth} localization={localization}>
            <Head title={t('Dashboard')} />

            <div className='mx-auto max-w-7xl space-y-6 px-2 sm:px-6 lg:px-8'>
                <div className='rounded-lg bg-white p-4 shadow-md transition duration-300 ease-linear sm:p-8 dark:bg-gray-800'>
                    <p className='text-gray-900 dark:text-gray-100'>{t('Welcome')}</p>
                </div>
            </div>
        </CustomerLayout>
    );
}