import { useState } from 'react';
import ActionDialogButton from '@/Components/generic/ActionDialogButton';
import { type CategoryProducts } from '@/Shared/Types/CategoryProductsTypes';
import { updateCategoriesProductDatas } from '@/Shared/Datas/Configs/CategoriesProduct/UpdateCategoriesProductDatas';
import CategoryProductsInfosForm from '@/Components/forms/CashRegister/CategoryProducts/CategoryProductsInfosForm';

interface UpdateCategoriesProductProps {
    category: CategoryProducts;
}
export default function UpdateCategoriesProduct({
    category,
}: UpdateCategoriesProductProps): JSX.Element {
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
                isUpdate
            >
                <CategoryProductsInfosForm category={category} closeDialog={closeDialog} isUpdate />
            </ActionDialogButton>
        </section>
    );
}
