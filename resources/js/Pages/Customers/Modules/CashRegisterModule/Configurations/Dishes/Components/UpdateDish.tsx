import { useState } from 'react';
import { type Dish } from '@/Shared/Types/DishTypes';
import { updateDishDatas } from '@/Shared/Datas/Configs/Dishes/UpdateDishDatas';
import { DishInfosForm } from '@/Components/forms/CashRegister/Dish/DishInfosForm';
import UpdateDeleteEntityComponent from '@/Components/generic/UpdateDeleteEntityComponent';

export default function UpdateDish({ dish }: { dish: Dish }): JSX.Element {
    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <UpdateDeleteEntityComponent
                datas={updateDishDatas}
                open={open}
                setOpen={setOpen}
                isUpdate={true}
            >
                <DishInfosForm dish={dish} closeDialog={closeDialog} isUpdate={true} />
            </UpdateDeleteEntityComponent>
        </section>
    );
}
