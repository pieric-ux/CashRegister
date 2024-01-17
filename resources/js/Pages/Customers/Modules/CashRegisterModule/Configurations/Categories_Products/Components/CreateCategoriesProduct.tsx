import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
import { CategoryProductsInfosForm } from '@/Components/forms/CashRegister/CategoryProducts/CategoryProductsInfosForm';
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

export default function CreateCategoriesProduct({ application }): JSX.Element {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <Card>
                <CardHeader size={'xl'}>
                    <CardTitle>{t('Create a Category of Product')}</CardTitle>
                    <CardDescription>
                        {t(
                            "Don't have any category of product yet? Looking to add another one? Click the 'Create' button to begin.",
                        )}
                    </CardDescription>
                </CardHeader>
                <CardFooter size={'xl'}>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button aria-label={t('Create your category of product')}>
                                {t('Create')}
                            </Button>
                        </DialogTrigger>
                        <DialogContent size={'2xl'}>
                            <DialogHeader>
                                <DialogTitle>{t('Create Category of Product')}</DialogTitle>
                                <DialogDescription>
                                    {t(
                                        "Ready to create a new category of product? Fill out the form below with the required details and hit the 'Create' button to get started.",
                                    )}
                                </DialogDescription>
                            </DialogHeader>
                            <CategoryProductsInfosForm
                                application={application}
                                closeDialog={closeDialog}
                            />
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </section>
    );
}
