import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { type Workstation } from '@/Shared/Types/WorkstationTypes';
import { ConfirmDeleteForm } from '@/Components/forms/Auth/ConfirmDeleteForm';
import UpdateDeleteEntityComponent from '@/Components/generic/UpdateDeleteEntityComponent';
import { deleteWorkstationDatas } from '@/Shared/Datas/Configs/Workstations/DeleteWorkstationDatas';

export default function DeleteWorkstation({
    workstation,
}: {
    workstation: Workstation;
}): JSX.Element {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <UpdateDeleteEntityComponent
                datas={deleteWorkstationDatas}
                open={open}
                setOpen={setOpen}
            >
                <ConfirmDeleteForm
                    route={route('workstations.destroy', workstation)}
                    closeDialog={closeDialog}
                    ariaLabel={t('Delete the workstation')}
                    buttonTiltle={t('Delete Workstation')}
                />
            </UpdateDeleteEntityComponent>
        </section>
    );
}
