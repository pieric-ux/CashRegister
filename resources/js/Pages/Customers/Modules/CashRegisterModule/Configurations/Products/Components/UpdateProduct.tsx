import { useState } from 'react';
import { type Product } from '@/Shared/Types/ProductTypes';
import ActionDialogButton from '@/Components/generic/ActionDialogButton';
import { updateProductDatas } from '@/Shared/Datas/Configs/Products/UpdateProductDatas';
import { ProductInfosForm } from '@/Components/forms/CashRegister/Product/ProductInfosForm';

export default function UpdateProduct({ product }: { product: Product }): JSX.Element {
    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <ActionDialogButton
                datas={updateProductDatas}
                open={open}
                setOpen={setOpen}
                isUpdate={true}
            >
                <ProductInfosForm product={product} closeDialog={closeDialog} isUpdate={true} />
            </ActionDialogButton>
        </section>
    );
}
