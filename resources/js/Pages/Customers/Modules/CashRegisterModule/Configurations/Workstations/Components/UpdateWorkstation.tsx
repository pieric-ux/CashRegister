import { useState } from 'react';
import { type Workstation } from '@/Shared/Types/WorkstationTypes';
import ActionDialogButton from '@/Components/generic/ActionDialogButton';
import { updateWorkstationDatas } from '@/Shared/Datas/Configs/Workstations/UpdateWorkstationDatas';
import { WorkstationInfosForm } from '@/Components/forms/CashRegister/Workstation/WorkstationInfosForm';

export default function UpdateWorkstation({
    workstation,
}: {
    workstation: Workstation;
}): JSX.Element {
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
                isUpdate={true}
            >
                <WorkstationInfosForm
                    workstation={workstation}
                    closeDialog={closeDialog}
                    isUpdate={true}
                />
            </ActionDialogButton>
        </section>
    );
}
