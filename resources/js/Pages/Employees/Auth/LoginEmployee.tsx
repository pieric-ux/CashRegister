import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { CardContent } from '@/Components/ui/card/card';
import LoginForm from '@/Components/forms/Auth/LoginForm';
import GuestLayout from '@/Components/layouts/Guest/GuestLayout';
import { Alert, AlertDescription } from '@/Components/ui/alert/alert';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { employeeFormDatas } from '@/Shared/Datas/Forms/Auth/LoginFormDatas';

interface LoginProps {
    status: string;
    cashRegisterModule: CashRegister;
    passwordless: string;
}
export default function LoginEmployee({
    status,
    cashRegisterModule,
    passwordless,
}: LoginProps): JSX.Element {
    const { t } = useTranslation();
    const defaultValues = {
        passwordless,
    };
    return (
        <>
            <Head title={t('Log in')} />

            <CardContent>
                {status && (
                    <>
                        <Alert className='mb-4' variant={'success'}>
                            <AlertDescription>{t(status)}</AlertDescription>
                        </Alert>
                    </>
                )}
                <LoginForm
                    defaultValues={defaultValues}
                    formDatas={employeeFormDatas}
                    cashRegisterModule={cashRegisterModule}
                    isEmployee
                />
            </CardContent>
        </>
    );
}

LoginEmployee.layout = (page: JSX.Element) => <GuestLayout children={page} />;
