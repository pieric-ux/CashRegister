import { useState } from 'react';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import ActionDialogButton from '@/Components/generic/ActionDialogButton';
import ConfirmDeleteForm from '@/Components/forms/Auth/ConfirmDeleteForm';
import { deleteEmployeeDatas } from '@/Shared/Datas/Configs/Employees/DeleteEmployeeDatas';

interface DeleteEmployeeProps {
    employee?: Employee;
    employees?: Employee[];
    disabled?: boolean;
}

export default function DeleteEmployee({
    employee,
    employees,
    disabled = false,
}: DeleteEmployeeProps): JSX.Element {
    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <ActionDialogButton
                datas={deleteEmployeeDatas}
                open={open}
                setOpen={setOpen}
                disabled={disabled}
            >
                <ConfirmDeleteForm
                    route={route('employees.destroy', employee?.id)}
                    closeDialog={closeDialog}
                    datas={deleteEmployeeDatas}
                    multipleDeleteDatas={employees}
                />
            </ActionDialogButton>
        </section>
    );
}
