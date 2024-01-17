import { useTranslation } from 'react-i18next';
import { UpdateUserAvatarForm } from '@/Components/forms/Common/UpdateUserAvatarForm';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card/card';

export default function UpdateUserAvatar({
    avatarPath,
    isEmployee = false,
}: {
    avatarPath: string;
    isEmployee?: boolean;
}): JSX.Element {
    const { t } = useTranslation();

    return (
        <section>
            <Card>
                <CardHeader size={'xl'}>
                    <CardTitle>{t('Update Avatar')}</CardTitle>
                    <CardDescription>{t("Update your avatar's profile.")}</CardDescription>
                </CardHeader>
                <CardContent size={'xl'}>
                    <UpdateUserAvatarForm avatarPath={avatarPath} isEmployee={isEmployee} />
                </CardContent>
            </Card>
        </section>
    );
}
