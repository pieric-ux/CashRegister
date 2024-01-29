import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
import ConfirmDeleteForm from '@/Components/forms/Auth/ConfirmDeleteForm';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog/dialog';

export default function DeleteUser(): JSX.Element {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <Card>
                <CardHeader size={'xl'}>
                    <CardTitle>{t('Delete Account')}</CardTitle>
                    <CardDescription>
                        {t(
                            'Once your account is deleted, all of its resources and data will be permanently deleted.',
                        )}
                    </CardDescription>
                </CardHeader>
                <CardFooter size={'xl'}>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant={'destructive'} aria-label={t('Delete your account')}>
                                {t('Delete Account')}
                            </Button>
                        </DialogTrigger>
                        <DialogContent size={'2xl'}>
                            <DialogHeader>
                                <DialogTitle>
                                    {t('Are you sure you want to delete your account?')}
                                </DialogTitle>
                                <DialogDescription>
                                    {t(
                                        'Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.',
                                    )}
                                </DialogDescription>
                            </DialogHeader>
                            <ConfirmDeleteForm
                                ariaLabel={t('Delete your account')}
                                buttonTiltle={t('Delete Account')}
                                closeDialog={closeDialog}
                                route={route('profile.destroy')}
                            />
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </section>
    );
}
