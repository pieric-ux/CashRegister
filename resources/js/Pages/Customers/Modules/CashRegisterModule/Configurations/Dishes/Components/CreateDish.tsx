import { useState } from 'react';
import CreateEntityComponent from '@/Components/generic/CreateEntityComponent';
import DishInfosForm from '@/Components/forms/CashRegister/Dish/DishInfosForm';
import { createDishDatas } from '@/Shared/Datas/Configs/Dishes/CreateDishDatas';

export default function CreateDish(): JSX.Element {
    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <CreateEntityComponent datas={createDishDatas} open={open} setOpen={setOpen}>
                <DishInfosForm closeDialog={closeDialog} />
            </CreateEntityComponent>
        </section>
    );
}
