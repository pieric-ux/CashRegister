import { useState } from 'react';
import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
import { ConfirmDeleteForm } from '@/Components/forms/Common/ConfirmDeleteForm';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog/dialog';

export default function DeleteWorkstation({ workstation }): JSX.Element {
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
                        aria-label={t('Delete the workstation')}
                    >
                        <Svg type={'delete'} variant={'destructive'} />
                    </Button>
                </DialogTrigger>
                <DialogContent size={'2xl'}>
                    <DialogHeader>
                        <DialogTitle>
                            {t('Are you sure you want to delete your workstation?')}
                        </DialogTitle>
                        <DialogDescription>
                            {t(
                                'Once your workstation is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your workstation.',
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <ConfirmDeleteForm
                        route={route('workstations.destroy', workstation)}
                        closeDialog={closeDialog}
                        ariaLabel={t('Delete the workstation')}
                        buttonTiltle={t('Delete Workstation')}
                    />
                </DialogContent>
            </Dialog>
        </section>
    );
}
