import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { type Product } from '@/Shared/Types/ProductTypes';
import { ConfirmDeleteForm } from '@/Components/forms/Auth/ConfirmDeleteForm';
import { deleteProductDatas } from '@/Shared/Datas/Configs/Products/DeleteProductDatas';
import UpdateDeleteEntityComponent from '@/Components/generic/UpdateDeleteEntityComponent';

export default function DeleteProduct({ product }: { product: Product }): JSX.Element {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <UpdateDeleteEntityComponent datas={deleteProductDatas} open={open} setOpen={setOpen}>
                <ConfirmDeleteForm
                    route={route('products.destroy', product)}
                    closeDialog={closeDialog}
                    ariaLabel={t('Delete the product')}
                    buttonTiltle={t('Delete Product')}
                />
            </UpdateDeleteEntityComponent>
        </section>
    );
}
