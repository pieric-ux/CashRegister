import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle } from '@/Components/ui/card/card';
import CustomerLayout from '@/Components/layouts/Auth/Customer/CustomerLayout';

export default function Dashboard(): JSX.Element {
    const { t } = useTranslation();

    return (
        <CustomerLayout>
            <Head title={t('Dashboard')} />

            <Card>
                <CardHeader>
                    <CardTitle>{t('Welcome')}</CardTitle>
                </CardHeader>
            </Card>
        </CustomerLayout>
    );
}
