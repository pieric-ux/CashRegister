import { useState } from 'react';
import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
import { type Workstation } from '@/Shared/Types/WorkstationTypes';
import { WorkstationInfosForm } from '@/Components/forms/CashRegister/Workstation/WorkstationInfosForm';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog/dialog';

export default function UpdateWorkstation({
    workstation,
}: {
    workstation: Workstation;
}): JSX.Element {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button size={'icon'} aria-label={t('Edit the workstation')}>
                        <Svg type={'edit'} />
                    </Button>
                </DialogTrigger>
                <DialogContent size={'2xl'}>
                    <DialogHeader>
                        <DialogTitle>{t('Edit Workstation')}</DialogTitle>
                        <DialogDescription>
                            {t(
                                "Ready to update the workstation? Fill out the form below with the required details and click the 'Save' button to apply the changes.",
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <WorkstationInfosForm
                        workstation={workstation}
                        closeDialog={closeDialog}
                        isUpdate={true}
                    />
                </DialogContent>
            </Dialog>
        </section>
    );
}
