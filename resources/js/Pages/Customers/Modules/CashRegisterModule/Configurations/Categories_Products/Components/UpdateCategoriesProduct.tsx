import { useState } from 'react';
import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
import { CategoryProductsInfosForm } from '@/Components/forms/CashRegister/CategoryProducts/CategoryProductsInfosForm';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog/dialog';

export default function UpdateCategoriesProduct({ category }): JSX.Element {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button size={'icon'} aria-label={t('Edit the category of product')}>
                        <Svg type={'edit'} />
                    </Button>
                </DialogTrigger>
                <DialogContent size={'2xl'}>
                    <DialogHeader>
                        <DialogTitle>{t('Edit Category of product')}</DialogTitle>
                        <DialogDescription>
                            {t(
                                "Ready to update the category of product? Fill out the form below with the required details and click the 'Save' button to apply the changes.",
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <CategoryProductsInfosForm
                        category={category}
                        closeDialog={closeDialog}
                        isUpdate={true}
                    />
                </DialogContent>
            </Dialog>
        </section>
    );
}
