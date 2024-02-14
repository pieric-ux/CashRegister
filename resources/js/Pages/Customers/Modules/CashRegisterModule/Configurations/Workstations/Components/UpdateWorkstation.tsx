import { useState } from 'react';
import { type Product } from '@/Shared/Types/ProductTypes';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import { type Workstation } from '@/Shared/Types/WorkstationTypes';
import ActionDialogButton from '@/Components/generic/ActionDialogButton';
import { updateWorkstationDatas } from '@/Shared/Datas/Configs/Workstations/UpdateWorkstationDatas';
import WorkstationInfosForm from '@/Components/forms/CashRegister/Workstation/WorkstationInfosForm';

interface UpdateWorkstationProps {
    workstation: Workstation & {
        cr_employees: Employee[];
        cr_products: Product[];
        generalProducts: Product[];
    };
}

export default function UpdateWorkstation({ workstation }: UpdateWorkstationProps): JSX.Element {
    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <ActionDialogButton
                datas={updateWorkstationDatas}
                open={open}
                setOpen={setOpen}
                isUpdate
            >
                <WorkstationInfosForm
                    workstation={workstation}
                    closeDialog={closeDialog}
                    isUpdate
                />
            </ActionDialogButton>
        </section>
    );
}
