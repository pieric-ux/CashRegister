import { useState } from 'react';
import CreateEntityComponent from '@/Components/generic/CreateEntityComponent';
import { CashRegisterInfosForm } from '@/Components/forms/CashRegister/CashRegisterInfosForm';
import { createCashRegisterDatas } from '@/Shared/Datas/Configs/CashRegisterModule/CreateCashRegisterDatas';

export default function CreateCashRegister(): JSX.Element {
    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <CreateEntityComponent datas={createCashRegisterDatas} open={open} setOpen={setOpen}>
                <CashRegisterInfosForm closeDialog={closeDialog} />
            </CreateEntityComponent>
        </section>
    );
}
