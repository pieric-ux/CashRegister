import { useState } from 'react';
import { type CategoryProducts } from '@/Shared/Types/CategoryProductsTypes';
import { CategoryProductsInfosForm } from '@/Components/forms/CashRegister/CategoryProducts/CategoryProductsInfosForm';
import UpdateDeleteEntityComponent from '@/Components/generic/UpdateDeleteEntityComponent';
import { updateCategoriesProductDatas } from '@/Shared/Datas/Configs/CategoriesProduct/UpdateCategoriesProductDatas';

export default function UpdateCategoriesProduct({
    category,
}: {
    category: CategoryProducts;
}): JSX.Element {
    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <UpdateDeleteEntityComponent
                datas={updateCategoriesProductDatas}
                open={open}
                setOpen={setOpen}
                isUpdate={true}
            >
                <CategoryProductsInfosForm
                    category={category}
                    closeDialog={closeDialog}
                    isUpdate={true}
                />
            </UpdateDeleteEntityComponent>
        </section>
    );
}
