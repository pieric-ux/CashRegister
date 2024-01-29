import { useContext, useState } from 'react';
import ActionDialogButton from '@/Components/generic/ActionDialogButton';
import ConfirmDeleteForm from '@/Components/forms/Auth/ConfirmDeleteForm';
import { ShowCashRegisterInfosContext } from '@/Context/CashRegisterModulesContext';
import { deleteCashRegisterDatas } from '@/Shared/Datas/Configs/CashRegisterModule/DeleteCashRegisterDatas';

export default function DeleteCashRegister(): JSX.Element {
    const { cashRegisterModule } = useContext(ShowCashRegisterInfosContext);

    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <ActionDialogButton datas={deleteCashRegisterDatas} open={open} setOpen={setOpen}>
                <ConfirmDeleteForm
                    datas={deleteCashRegisterDatas}
                    route={route('cashregisters.destroy', cashRegisterModule.slug)}
                    closeDialog={closeDialog}
                />
            </ActionDialogButton>
        </section>
    );
}
