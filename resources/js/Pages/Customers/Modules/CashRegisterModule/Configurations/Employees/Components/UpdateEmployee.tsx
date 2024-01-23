import { useState } from 'react';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import UpdateDeleteEntityComponent from '@/Components/generic/UpdateDeleteEntityComponent';
import { updateEmployeeDatas } from '@/Shared/Datas/Configs/Employees/UpdateEmployeeDatas';
import { EmployeeProfileForm } from '@/Components/forms/CashRegister/Employee/EmployeeProfileForm';

export default function UpdateEmployee({ employee }: { employee: Employee }): JSX.Element {
    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <UpdateDeleteEntityComponent
                datas={updateEmployeeDatas}
                open={open}
                setOpen={setOpen}
                isUpdate={true}
            >
                <EmployeeProfileForm
                    employee={employee}
                    closeDialog={closeDialog}
                    isUpdate={true}
                />
            </UpdateDeleteEntityComponent>
        </section>
    );
}
