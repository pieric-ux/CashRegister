import { useState } from 'react';
import { type Dish } from '@/Shared/Types/DishTypes';
import ActionDialogButton from '@/Components/generic/ActionDialogButton';
import ConfirmDeleteForm from '@/Components/forms/Auth/ConfirmDeleteForm';
import { deleteDishDatas } from '@/Shared/Datas/Configs/Dishes/DeleteDishDatas';

interface DeleteDishProps {
    dish?: Dish;
    dishes?: Dish[];
    disabled?: boolean;
}

export default function DeleteDish({
    dish,
    dishes,
    disabled = false,
}: DeleteDishProps): JSX.Element {
    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <ActionDialogButton
                datas={deleteDishDatas}
                open={open}
                setOpen={setOpen}
                disabled={disabled}
            >
                <ConfirmDeleteForm
                    route={route('dishes.destroy', dish?.id)}
                    closeDialog={closeDialog}
                    datas={deleteDishDatas}
                    multipleDeleteDatas={dishes}
                />
            </ActionDialogButton>
        </section>
    );
}
