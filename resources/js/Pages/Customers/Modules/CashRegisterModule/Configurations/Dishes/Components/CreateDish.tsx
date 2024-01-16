import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
import { DishInfosForm } from '@/Components/forms/Dish/DishInfosForm';
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

export default function CreateDish({ application }): JSX.Element {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <Card>
                <CardHeader size={'xl'}>
                    <CardTitle>{t('Create a Dish')}</CardTitle>
                    <CardDescription>
                        {t(
                            "Don't have any dish yet? Looking to add another one? Click the 'Create' button to begin.",
                        )}
                    </CardDescription>
                </CardHeader>
                <CardFooter size={'xl'}>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button aria-label={t('Create your dish')}>{t('Create')}</Button>
                        </DialogTrigger>
                        <DialogContent size={'2xl'}>
                            <DialogHeader>
                                <DialogTitle>{t('Create Dish')}</DialogTitle>
                                <DialogDescription>
                                    {t(
                                        "Ready to create a new dish? Fill out the form below with the required details and hit the 'Create' button to get started.",
                                    )}
                                </DialogDescription>
                            </DialogHeader>
                            <DishInfosForm application={application} closeDialog={closeDialog} />
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </section>
    );
}
