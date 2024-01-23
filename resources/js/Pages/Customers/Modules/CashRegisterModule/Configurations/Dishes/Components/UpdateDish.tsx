import { useState } from 'react';
import { type Dish } from '@/Shared/Types/DishTypes';
import ActionDialogButton from '@/Components/generic/ActionDialogButton';
import { updateDishDatas } from '@/Shared/Datas/Configs/Dishes/UpdateDishDatas';
import { DishInfosForm } from '@/Components/forms/CashRegister/Dish/DishInfosForm';

export default function UpdateDish({ dish }: { dish: Dish }): JSX.Element {
    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <ActionDialogButton
                datas={updateDishDatas}
                open={open}
                setOpen={setOpen}
                isUpdate={true}
            >
                <DishInfosForm dish={dish} closeDialog={closeDialog} isUpdate={true} />
            </ActionDialogButton>
        </section>
    );
}
