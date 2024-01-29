import { useState } from 'react';
import CreateEntityComponent from '@/Components/generic/CreateEntityComponent';
import { createWorkstationDatas } from '@/Shared/Datas/Configs/Workstations/CreateWorkstationDatas';
import WorkstationInfosForm from '@/Components/forms/CashRegister/Workstation/WorkstationInfosForm';

export default function CreateWorkstation(): JSX.Element {
    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <CreateEntityComponent datas={createWorkstationDatas} open={open} setOpen={setOpen}>
                <WorkstationInfosForm closeDialog={closeDialog} />
            </CreateEntityComponent>
        </section>
    );
}
