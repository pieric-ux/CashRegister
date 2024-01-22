import { useState } from 'react';
import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import { EmployeeProfileForm } from '@/Components/forms/CashRegister/Employee/EmployeeProfileForm';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog/dialog';

export default function UpdateEmployee({ employee }: { employee: Employee }): JSX.Element {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button size={'icon'} aria-label={t('Edit your employee')}>
                        <Svg type={'edit'} />
                    </Button>
                </DialogTrigger>
                <DialogContent size={'2xl'}>
                    <DialogHeader>
                        <DialogTitle>{t('Edit Employee')}</DialogTitle>
                        <DialogDescription>
                            {t(
                                "Ready to update the employee? Fill out the form below with the required details and click the 'Save' button to apply the changes.",
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <EmployeeProfileForm
                        employee={employee}
                        closeDialog={closeDialog}
                        isUpdate={true}
                    />
                </DialogContent>
            </Dialog>
        </section>
    );
}
