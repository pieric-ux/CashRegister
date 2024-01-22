import { useState } from 'react';
import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
import { type Product } from '@/Shared/Types/ProductTypes';
import { ConfirmDeleteForm } from '@/Components/forms/Auth/ConfirmDeleteForm';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog/dialog';

export default function DeleteProduct({ product }: { product: Product }): JSX.Element {
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
                        aria-label={t('Delete the product')}
                    >
                        <Svg type={'delete'} variant={'destructive'} />
                    </Button>
                </DialogTrigger>
                <DialogContent size={'2xl'}>
                    <DialogHeader>
                        <DialogTitle>
                            {t('Are you sure you want to delete your product?')}
                        </DialogTitle>
                        <DialogDescription>
                            {t(
                                'Once your product is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your product.',
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <ConfirmDeleteForm
                        route={route('products.destroy', product)}
                        closeDialog={closeDialog}
                        ariaLabel={t('Delete the product')}
                        buttonTiltle={t('Delete Product')}
                    />
                </DialogContent>
            </Dialog>
        </section>
    );
}
