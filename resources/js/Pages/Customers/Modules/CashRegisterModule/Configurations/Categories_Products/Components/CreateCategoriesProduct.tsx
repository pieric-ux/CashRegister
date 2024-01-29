import { useState } from 'react';
import CreateEntityComponent from '@/Components/generic/CreateEntityComponent';
import { createCategoriesProductDatas } from '@/Shared/Datas/Configs/CategoriesProduct/CreateCategoriesProductDatas';
import CategoryProductsInfosForm from '@/Components/forms/CashRegister/CategoryProducts/CategoryProductsInfosForm';

export default function CreateCategoriesProduct(): JSX.Element {
    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <CreateEntityComponent
                datas={createCategoriesProductDatas}
                open={open}
                setOpen={setOpen}
            >
                <CategoryProductsInfosForm closeDialog={closeDialog} />
            </CreateEntityComponent>
        </section>
    );
}
