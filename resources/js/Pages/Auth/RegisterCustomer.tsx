import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import CustomerProfileForm from '@/Components/forms/Customer/CustomerProfileForm';

export default function RegisterCustomer(): JSX.Element {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('Register')} />
            <CustomerProfileForm />
        </>
    );
}
