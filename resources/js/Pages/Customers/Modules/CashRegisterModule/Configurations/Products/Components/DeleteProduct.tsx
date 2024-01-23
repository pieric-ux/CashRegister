import { useState } from 'react';
import { type Product } from '@/Shared/Types/ProductTypes';
import ActionDialogButton from '@/Components/generic/ActionDialogButton';
import { ConfirmDeleteForm } from '@/Components/forms/Auth/ConfirmDeleteForm';
import { deleteProductDatas } from '@/Shared/Datas/Configs/Products/DeleteProductDatas';

export default function DeleteProduct({ product }: { product: Product }): JSX.Element {
    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <ActionDialogButton datas={deleteProductDatas} open={open} setOpen={setOpen}>
                <ConfirmDeleteForm
                    datas={deleteProductDatas}
                    route={route('products.destroy', product)}
                    closeDialog={closeDialog}
                />
            </ActionDialogButton>
        </section>
    );
}
