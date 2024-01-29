import { useState } from 'react';
import ActionDialogButton from '@/Components/generic/ActionDialogButton';
import { type CategoryProducts } from '@/Shared/Types/CategoryProductsTypes';
import ConfirmDeleteForm from '@/Components/forms/Auth/ConfirmDeleteForm';
import { deleteCategoriesProductDatas } from '@/Shared/Datas/Configs/CategoriesProduct/DeleteCategoriesProductDatas';

interface DeleteCategoriesProductProps {
    category: CategoryProducts;
}
export default function DeleteCategoriesProduct({
    category,
}: DeleteCategoriesProductProps): JSX.Element {
    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <ActionDialogButton datas={deleteCategoriesProductDatas} open={open} setOpen={setOpen}>
                <ConfirmDeleteForm
                    datas={deleteCategoriesProductDatas}
                    route={route('categories.destroy', category)}
                    closeDialog={closeDialog}
                />
            </ActionDialogButton>
        </section>
    );
}
