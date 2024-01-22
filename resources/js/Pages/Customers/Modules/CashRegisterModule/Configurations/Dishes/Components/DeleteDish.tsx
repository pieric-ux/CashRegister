import { useState } from 'react';
import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import { type Dish } from '@/Shared/Types/DishTypes';
import { Button } from '@/Components/ui/button/button';
import { ConfirmDeleteForm } from '@/Components/forms/Auth/ConfirmDeleteForm';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog/dialog';

export default function DeleteDish({ dish }: { dish: Dish }): JSX.Element {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant={'destructive'} size={'icon'} aria-label={t('Delete the dish')}>
                        <Svg type={'delete'} variant={'destructive'} />
                    </Button>
                </DialogTrigger>
                <DialogContent size={'2xl'}>
                    <DialogHeader>
                        <DialogTitle>{t('Are you sure you want to delete your dish?')}</DialogTitle>
                        <DialogDescription>
                            {t(
                                'Once your dish is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your dish.',
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <ConfirmDeleteForm
                        route={route('dishes.destroy', dish)}
                        closeDialog={closeDialog}
                        ariaLabel={t('Delete the dish')}
                        buttonTiltle={t('Delete Dish')}
                    />
                </DialogContent>
            </Dialog>
        </section>
    );
}
