import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { type CategoryProducts } from '@/Shared/Types/CategoryProductsTypes';
import { ConfirmDeleteForm } from '@/Components/forms/Auth/ConfirmDeleteForm';
import UpdateDeleteEntityComponent from '@/Components/generic/UpdateDeleteEntityComponent';
import { deleteCategoriesProductDatas } from '@/Shared/Datas/Configs/CategoriesProduct/DeleteCategoriesProductDatas';

export default function DeleteCategoriesProduct({
    category,
}: {
    category: CategoryProducts;
}): JSX.Element {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    const closeDialog = (): void => {
        setOpen(false);
    };

    return (
        <section>
            <UpdateDeleteEntityComponent
                datas={deleteCategoriesProductDatas}
                open={open}
                setOpen={setOpen}
            >
                <ConfirmDeleteForm
                    route={route('categories.destroy', category)}
                    closeDialog={closeDialog}
                    ariaLabel={t('Delete the category of product')}
                    buttonTiltle={t('Delete Category')}
                />
            </UpdateDeleteEntityComponent>
        </section>
    );
}
