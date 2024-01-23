import { useState } from 'react';
import { type Product } from '@/Shared/Types/ProductTypes';
import { updateProductDatas } from '@/Shared/Datas/Configs/Products/UpdateProductDatas';
import UpdateDeleteEntityComponent from '@/Components/generic/UpdateDeleteEntityComponent';
import { ProductInfosForm } from '@/Components/forms/CashRegister/Product/ProductInfosForm';

export default function UpdateProduct({ product }: { product: Product }): JSX.Element {
    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <UpdateDeleteEntityComponent
                datas={updateProductDatas}
                open={open}
                setOpen={setOpen}
                isUpdate={true}
            >
                <ProductInfosForm product={product} closeDialog={closeDialog} isUpdate={true} />
            </UpdateDeleteEntityComponent>
        </section>
    );
}
