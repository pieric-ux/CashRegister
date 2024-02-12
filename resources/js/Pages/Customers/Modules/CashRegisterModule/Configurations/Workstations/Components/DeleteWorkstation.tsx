import { useState } from 'react';
import { type Product } from '@/Shared/Types/ProductTypes';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import { type Workstation } from '@/Shared/Types/WorkstationTypes';
import ActionDialogButton from '@/Components/generic/ActionDialogButton';
import ConfirmDeleteForm from '@/Components/forms/Auth/ConfirmDeleteForm';
import { deleteWorkstationDatas } from '@/Shared/Datas/Configs/Workstations/DeleteWorkstationDatas';

interface DeleteWorkstationProps {
    workstation: Workstation & {
        cr_employees: Employee[];
        cr_products: Product[];
        generalProducts: Product[];
    };
}

export default function DeleteWorkstation({ workstation }: DeleteWorkstationProps): JSX.Element {
    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };
    // FIXME: check type with Flavien
    return (
        <section>
            <ActionDialogButton datas={deleteWorkstationDatas} open={open} setOpen={setOpen}>
                <ConfirmDeleteForm
                    datas={deleteWorkstationDatas}
                    route={route('workstations.destroy', workstation)}
                    closeDialog={closeDialog}
                />
            </ActionDialogButton>
        </section>
    );
}
