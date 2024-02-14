import { useState } from 'react';
import { type Dish } from '@/Shared/Types/DishTypes';
import { type Product } from '@/Shared/Types/ProductTypes';
import ActionDialogButton from '@/Components/generic/ActionDialogButton';
import { type CategoryProducts } from '@/Shared/Types/CategoryProductsTypes';
import { updateProductDatas } from '@/Shared/Datas/Configs/Products/UpdateProductDatas';
import ProductInfosForm from '@/Components/forms/CashRegister/Product/ProductInfosForm';

interface UpdateProductProps {
    product: Product & {
        cr_categories_products: CategoryProducts;
        cr_dishes: Dish;
    };
}

export default function UpdateProduct({ product }: UpdateProductProps): JSX.Element {
    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <ActionDialogButton datas={updateProductDatas} open={open} setOpen={setOpen} isUpdate>
                <ProductInfosForm product={product} closeDialog={closeDialog} isUpdate />
            </ActionDialogButton>
        </section>
    );
}
