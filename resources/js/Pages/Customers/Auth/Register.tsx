import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { CardContent } from '@/Components/ui/card/card';
import GuestLayout from '@/Components/layouts/Guest/GuestLayout';
import { CustomerProfileForm } from '@/Components/forms/CustomerProfileForm';

export default function Register(): JSX.Element {
    const { t } = useTranslation();

    return (
        <GuestLayout>
            <Head title={t('Register')} />

            <CardContent>
                <CustomerProfileForm />
            </CardContent>
        </GuestLayout>
    );
}
