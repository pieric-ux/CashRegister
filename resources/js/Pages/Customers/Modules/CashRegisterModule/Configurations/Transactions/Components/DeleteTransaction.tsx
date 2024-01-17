import { useState } from 'react';
import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog/dialog';
import { ConfirmDeleteForm } from '@/Components/forms/Common/ConfirmDeleteForm';

export default function DeleteTransaction({ transaction }): JSX.Element {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant={'destructive'}
                        size={'icon'}
                        aria-label={t('Delete the transaction')}
                    >
                        <Svg type={'delete'} variant={'destructive'} />
                    </Button>
                </DialogTrigger>
                <DialogContent size={'2xl'}>
                    <DialogHeader>
                        <DialogTitle>
                            {t('Are you sure you want to delete your transaction?')}
                        </DialogTitle>
                        <DialogDescription>
                            {t(
                                'Once your transaction is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your transaction.',
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <ConfirmDeleteForm
                        route={route('transactions.destroy', transaction)}
                        closeDialog={closeDialog}
                        ariaLabel={t('Delete the transaction')}
                        buttonTiltle={t('Delete Transaction')}
                    />
                </DialogContent>
            </Dialog>
        </section>
    );
}
