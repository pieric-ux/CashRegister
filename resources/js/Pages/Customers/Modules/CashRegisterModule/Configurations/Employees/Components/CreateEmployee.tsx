import { useState } from 'react';
import CreateEntityComponent from '@/Components/generic/CreateEntityComponent';
import { createEmployeeDatas } from '@/Shared/Datas/Configs/Employees/CreateEmployeeDatas';
import { EmployeeProfileForm } from '@/Components/forms/CashRegister/Employee/EmployeeProfileForm';

export default function CreateEmployee(): JSX.Element {
    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <CreateEntityComponent datas={createEmployeeDatas} open={open} setOpen={setOpen}>
                <EmployeeProfileForm closeDialog={closeDialog} />
            </CreateEntityComponent>
        </section>
    );
}
