import { useState } from 'react';
import { type Dish } from '@/Shared/Types/DishTypes';
import ActionDialogButton from '@/Components/generic/ActionDialogButton';
import { ConfirmDeleteForm } from '@/Components/forms/Auth/ConfirmDeleteForm';
import { deleteDishDatas } from '@/Shared/Datas/Configs/Dishes/DeleteDishDatas';

export default function DeleteDish({ dish }: { dish: Dish }): JSX.Element {
    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <ActionDialogButton datas={deleteDishDatas} open={open} setOpen={setOpen}>
                <ConfirmDeleteForm
                    datas={deleteDishDatas}
                    route={route('dishes.destroy', dish)}
                    closeDialog={closeDialog}
                />
            </ActionDialogButton>
        </section>
    );
}
