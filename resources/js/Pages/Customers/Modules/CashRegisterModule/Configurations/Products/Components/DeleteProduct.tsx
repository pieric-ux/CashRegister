import { useState } from 'react';
import { type Product } from '@/Shared/Types/ProductTypes';
import ActionDialogButton from '@/Components/generic/ActionDialogButton';
import ConfirmDeleteForm from '@/Components/forms/Auth/ConfirmDeleteForm';
import { deleteProductDatas } from '@/Shared/Datas/Configs/Products/DeleteProductDatas';

interface DeleteProductProps {
    product?: Product;
    products?: Product[];
    disabled?: boolean;
}

export default function DeleteProduct({
    product,
    products,
    disabled = false,
}: DeleteProductProps): JSX.Element {
    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <ActionDialogButton
                datas={deleteProductDatas}
                open={open}
                setOpen={setOpen}
                disabled={disabled}
            >
                <ConfirmDeleteForm
                    route={route('products.destroy', product?.id)}
                    closeDialog={closeDialog}
                    datas={deleteProductDatas}
                    multipleDeleteDatas={products}
                />
            </ActionDialogButton>
        </section>
    );
}
