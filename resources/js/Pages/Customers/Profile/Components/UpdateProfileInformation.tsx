import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
import { Alert, AlertDescription } from '@/Components/ui/alert/alert';
import CustomerProfileForm from '@/Components/forms/Customer/CustomerProfileForm';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card/card';

interface UpdateProfileInformationProps {
    mustVerifyEmail: boolean;
    status?: string;
}

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
}: UpdateProfileInformationProps): JSX.Element {
    const { t } = useTranslation();

    const { customerAuth } = usePage().props;

    return (
        <section>
            <Card>
                <CardHeader size={'xl'}>
                    <CardTitle>{t('Profile Information')}</CardTitle>
                    <CardDescription>
                        {t("Update your account's profile information and email address.")}
                    </CardDescription>
                </CardHeader>
                <CardContent size={'xl'}>
                    {mustVerifyEmail && customerAuth.customer.email_verified_at === null && (
                        <Alert>
                            <AlertDescription>
                                {t('Your email address is unverified.')}
                            </AlertDescription>
                            <Button variant={'link'} asChild>
                                <Link href={route('verification.send')} method='post' as='button'>
                                    {t('Click here to re-send the verification email.')}
                                </Link>
                            </Button>
                        </Alert>
                    )}
                    {status != null && (
                        <>
                            <Alert variant={'success'}>
                                <AlertDescription>{t(status)}</AlertDescription>
                            </Alert>
                        </>
                    )}
                    <CustomerProfileForm isUpdate={true} />
                </CardContent>
            </Card>
        </section>
    );
}
