import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import CustomerLayout from '@/Layouts/CustomerLayout';
import { Card, CardHeader, CardTitle } from '@/Components/ui/card/card';

export default function Dashboard({ customerAuth, localization }) {
    const { t } = useTranslation();

    return (
        <CustomerLayout auth={customerAuth} localization={localization}>
            <Head title={t('Dashboard')} />

            <div className='mx-auto max-w-7xl space-y-6 px-2 sm:px-6 lg:px-8'>
                <Card>
                    <CardHeader>
                        <CardTitle>{t('Welcome')}</CardTitle>
                    </CardHeader>
                </Card>
            </div>
        </CustomerLayout>
    );
}
