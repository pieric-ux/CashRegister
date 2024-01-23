import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { type Dish } from '@/Shared/Types/DishTypes';
import { ConfirmDeleteForm } from '@/Components/forms/Auth/ConfirmDeleteForm';
import { deleteDishDatas } from '@/Shared/Datas/Configs/Dishes/DeleteDishDatas';
import UpdateDeleteEntityComponent from '@/Components/generic/UpdateDeleteEntityComponent';

export default function DeleteDish({ dish }: { dish: Dish }): JSX.Element {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <UpdateDeleteEntityComponent datas={deleteDishDatas} open={open} setOpen={setOpen}>
                <ConfirmDeleteForm
                    route={route('dishes.destroy', dish)}
                    closeDialog={closeDialog}
                    ariaLabel={t('Delete the dish')}
                    buttonTiltle={t('Delete Dish')}
                />
            </UpdateDeleteEntityComponent>
        </section>
    );
}
