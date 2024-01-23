import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import { ConfirmDeleteForm } from '@/Components/forms/Auth/ConfirmDeleteForm';
import { deleteEmployeeDatas } from '@/Shared/Datas/Configs/Employees/DeleteEmployeeDatas';
import UpdateDeleteEntityComponent from '@/Components/generic/UpdateDeleteEntityComponent';

export default function DeleteEmployee({ employee }: { employee: Employee }): JSX.Element {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <UpdateDeleteEntityComponent datas={deleteEmployeeDatas} open={open} setOpen={setOpen}>
                <ConfirmDeleteForm
                    route={route('employees.destroy', employee)}
                    closeDialog={closeDialog}
                    ariaLabel={t('Delete your employee')}
                    buttonTiltle={t('Delete Employee')}
                />
            </UpdateDeleteEntityComponent>
        </section>
    );
}
