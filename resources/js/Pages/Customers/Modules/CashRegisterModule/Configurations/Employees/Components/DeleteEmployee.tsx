import { useState } from 'react';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import ActionDialogButton from '@/Components/generic/ActionDialogButton';
import ConfirmDeleteForm from '@/Components/forms/Auth/ConfirmDeleteForm';
import { deleteEmployeeDatas } from '@/Shared/Datas/Configs/Employees/DeleteEmployeeDatas';

interface DeleteEmployeeProps {
    employee: Employee;
}

export default function DeleteEmployee({ employee }: DeleteEmployeeProps): JSX.Element {
    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };
    // FIXME: check type with Flavien
    return (
        <section>
            <ActionDialogButton datas={deleteEmployeeDatas} open={open} setOpen={setOpen}>
                <ConfirmDeleteForm
                    datas={deleteEmployeeDatas}
                    route={route('employees.destroy', employee)}
                    closeDialog={closeDialog}
                />
            </ActionDialogButton>
        </section>
    );
}
