import { useState } from 'react';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import ActionDialogButton from '@/Components/generic/ActionDialogButton';
import { updateEmployeeDatas } from '@/Shared/Datas/Configs/Employees/UpdateEmployeeDatas';
import EmployeeProfileForm from '@/Components/forms/CashRegister/Employee/EmployeeProfileForm';

interface UpdateEmployeeProps {
    employee: Employee;
}

export default function UpdateEmployee({ employee }: UpdateEmployeeProps): JSX.Element {
    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <ActionDialogButton datas={updateEmployeeDatas} open={open} setOpen={setOpen} isUpdate>
                <EmployeeProfileForm employee={employee} closeDialog={closeDialog} isUpdate />
            </ActionDialogButton>
        </section>
    );
}
