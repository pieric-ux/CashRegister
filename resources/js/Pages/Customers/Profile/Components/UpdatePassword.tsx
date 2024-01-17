import { useTranslation } from 'react-i18next';
import { UpdateUserPasswordForm } from '@/Components/forms/Common/UpdateUserPasswordForm';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card/card';

export default function UpdatePassword(): JSX.Element {
    const { t } = useTranslation();

    return (
        <section>
            <Card>
                <CardHeader size={'xl'}>
                    <CardTitle>{t('Update Password')}</CardTitle>
                    <CardDescription>
                        {t('Ensure your account is using a long, random password to stay secure.')}
                    </CardDescription>
                </CardHeader>
                <CardContent size={'xl'}>
                    <UpdateUserPasswordForm />
                </CardContent>
            </Card>
        </section>
    );
}
