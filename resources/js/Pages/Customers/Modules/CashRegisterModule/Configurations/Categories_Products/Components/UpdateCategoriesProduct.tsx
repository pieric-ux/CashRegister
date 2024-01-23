import { useState } from 'react';
import ActionDialogButton from '@/Components/generic/ActionDialogButton';
import { type CategoryProducts } from '@/Shared/Types/CategoryProductsTypes';
import { updateCategoriesProductDatas } from '@/Shared/Datas/Configs/CategoriesProduct/UpdateCategoriesProductDatas';
import { CategoryProductsInfosForm } from '@/Components/forms/CashRegister/CategoryProducts/CategoryProductsInfosForm';

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
            <ActionDialogButton
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
            </ActionDialogButton>
        </section>
    );
}
