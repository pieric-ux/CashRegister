import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ConfirmDeleteForm } from '@/Components/forms/Auth/ConfirmDeleteForm';
import { ShowCashRegisterInfosContext } from '@/Context/CashRegisterModulesContext';
import UpdateDeleteEntityComponent from '@/Components/generic/UpdateDeleteEntityComponent';
import { deleteCashRegisterDatas } from '@/Shared/Datas/Configs/CashRegisterModule/DeleteCashRegisterDatas';

export default function DeleteCashRegister(): JSX.Element {
    const { t } = useTranslation();

    const { cashRegisterModule } = useContext(ShowCashRegisterInfosContext);

    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <UpdateDeleteEntityComponent
                datas={deleteCashRegisterDatas}
                open={open}
                setOpen={setOpen}
            >
                <ConfirmDeleteForm
                    route={route('cashregisters.destroy', cashRegisterModule.slug)}
                    closeDialog={closeDialog}
                    ariaLabel={t('Delete your app')}
                    buttonTiltle={t('Delete App')}
                />
            </UpdateDeleteEntityComponent>
        </section>
    );
}
