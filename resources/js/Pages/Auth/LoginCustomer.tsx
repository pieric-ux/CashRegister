import { useTranslation } from 'react-i18next';
import { Head, usePage } from '@inertiajs/react';
import LoginForm from '@/Components/forms/Auth/LoginForm';
import { Alert, AlertDescription } from '@/Components/ui/alert/alert';
import { defaultValues, formDatas } from '@/Shared/Datas/Forms/Auth/LoginFormDatas';

interface PageProps extends InertiaPageProps {
    status: string;
}
export default function LoginCustomer(): JSX.Element {
    const { t } = useTranslation();
    const { status } = usePage<PageProps>().props;

    return (
        <>
            <Head title={t('Log in')} />

            {status && (
                <>
                    <Alert className='mb-4' variant={'success'}>
                        <AlertDescription>{t(status)}</AlertDescription>
                    </Alert>
                </>
            )}
            <LoginForm defaultValues={defaultValues} formDatas={formDatas} />
        </>
    );
}
