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

export default function DeleteCategoriesProduct({ category }): JSX.Element {
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
                        aria-label={t('Delete the category of product')}
                    >
                        <Svg type={'delete'} variant={'destructive'} />
                    </Button>
                </DialogTrigger>
                <DialogContent size={'2xl'}>
                    <DialogHeader>
                        <DialogTitle>
                            {t('Are you sure you want to delete your category of product?')}
                        </DialogTitle>
                        <DialogDescription>
                            {t(
                                'Once your category of product is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your category of product.',
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <ConfirmDeleteForm
                        route={route('categories.destroy', category)}
                        closeDialog={closeDialog}
                        ariaLabel={t('Delete the category of product')}
                        buttonTiltle={t('Delete Category')}
                    />
                </DialogContent>
            </Dialog>
        </section>
    );
}
