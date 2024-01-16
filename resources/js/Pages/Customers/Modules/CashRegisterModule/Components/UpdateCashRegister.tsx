import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
import { Svg } from '@/Components/ui/svg/Svg';
import { CashRegisterInfosForm } from '@/Components/forms/CashRegister/CashRegisterInfosForm';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog/dialog';

export default function UpdateCashRegister({ application }): JSX.Element {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button size={'icon'} aria-label={t('Edit your app')}>
                        <Svg type={'edit'} />
                    </Button>
                </DialogTrigger>
                <DialogContent size={'2xl'}>
                    <DialogHeader>
                        <DialogTitle>{t('Edit App')}</DialogTitle>
                        <DialogDescription>
                            {t(
                                "Ready to update the application? Fill out the form below with the required details and click the 'Save' button to apply the changes.",
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <CashRegisterInfosForm
                        application={application}
                        isUpdate={true}
                        closeDialog={closeDialog}
                    />
                </DialogContent>
            </Dialog>
        </section>
    );
}
