import { useState } from 'react';
import UpdateDeleteEntityComponent from '@/Components/generic/UpdateDeleteEntityComponent';
import { CashRegisterInfosForm } from '@/Components/forms/CashRegister/CashRegisterInfosForm';
import { updateCashRegisterDatas } from '@/Shared/Datas/Configs/CashRegisterModule/UpdateCashRegisterDatas';

export default function UpdateCashRegister(): JSX.Element {
    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <UpdateDeleteEntityComponent
                datas={updateCashRegisterDatas}
                open={open}
                setOpen={setOpen}
                isUpdate={true}
            >
                <CashRegisterInfosForm isUpdate={true} closeDialog={closeDialog} />
            </UpdateDeleteEntityComponent>
        </section>
    );
}
