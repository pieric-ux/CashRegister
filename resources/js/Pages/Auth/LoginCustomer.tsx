import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import LoginForm from '@/Components/forms/Auth/LoginForm';
import { Alert, AlertDescription } from '@/Components/ui/alert/alert';
import { defaultValues, formDatas } from '@/Shared/Datas/Forms/Auth/LoginFormDatas';

interface LoginProps {
    status: string;
    canResetPassword: boolean;
}
export default function LoginCustomer({ status, canResetPassword }: LoginProps): JSX.Element {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('Log in')} />

            {status != null && (
                <>
                    <Alert className='mb-4' variant={'success'}>
                        <AlertDescription>{t(status)}</AlertDescription>
                    </Alert>
                </>
            )}
            <LoginForm
                defaultValues={defaultValues}
                formDatas={formDatas}
                canResetPassword={canResetPassword}
            />
        </>
    );
}
