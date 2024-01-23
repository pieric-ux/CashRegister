import { useState } from 'react';
import CreateEntityComponent from '@/Components/generic/CreateEntityComponent';
import { createProductDatas } from '@/Shared/Datas/Configs/Products/CreateProductDatas';
import { ProductInfosForm } from '@/Components/forms/CashRegister/Product/ProductInfosForm';

export default function CreateProduct(): JSX.Element {
    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <CreateEntityComponent datas={createProductDatas} open={open} setOpen={setOpen}>
                <ProductInfosForm closeDialog={closeDialog} />
            </CreateEntityComponent>
        </section>
    );
}
