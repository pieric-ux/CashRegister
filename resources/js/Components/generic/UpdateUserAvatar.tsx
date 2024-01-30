import { useTranslation } from 'react-i18next';
import UpdateUserAvatarForm from '@/Components/forms/Common/UpdateUserAvatarForm';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card/card';
import { usePage } from '@inertiajs/react';

interface UpdateUserAvatarProps {
    isEmployee?: boolean;
}

export default function UpdateUserAvatar({
    isEmployee = false,
}: UpdateUserAvatarProps): JSX.Element {
    const { t } = useTranslation();

    const { customerAuth } = usePage().props;

    return (
        <section>
            <Card>
                <CardHeader size={'xl'}>
                    <CardTitle>{t('Update Avatar')}</CardTitle>
                    <CardDescription>{t("Update your avatar's profile.")}</CardDescription>
                </CardHeader>
                <CardContent size={'xl'}>
                    <UpdateUserAvatarForm
                        avatarPath={customerAuth.avatarPath}
                        isEmployee={isEmployee}
                    />
                </CardContent>
            </Card>
        </section>
    );
}
