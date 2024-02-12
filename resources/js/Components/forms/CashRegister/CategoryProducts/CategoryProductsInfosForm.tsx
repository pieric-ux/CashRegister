'use client';

import { type FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Form } from '@/Components/ui/form/form';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { useForm as useFormInertia, usePage } from '@inertiajs/react';
import DialogFormFooter from '@/Components/forms/Common/DialogFormFooter';
import { type CategoryProducts } from '@/Shared/Types/CategoryProductsTypes';
import { GenericFormField } from '@/Components/ui/form/templates/GenericFormField';
import { getDefaultValues, formDatas } from '@/Shared/Datas/Forms/CategoryProductsInfosFormDatas';

interface PageProps extends InertiaPageProps {
    cashRegisterModule: CashRegister & {
        cr_categories_products: CategoryProducts[];
    };
}

interface CategoryProductsInfosFormProps {
    category?: CategoryProducts;
    closeDialog: () => void;
    isUpdate?: boolean;
}

export default function CategoryProductsInfosForm({
    category,
    closeDialog,
    isUpdate = false,
}: CategoryProductsInfosFormProps): JSX.Element {
    const { t } = useTranslation();

    const { cashRegisterModule } = usePage<PageProps>().props;

    const defaultValues = getDefaultValues(category, isUpdate); // FIXME: check type with Flavien

    const { data, setData, post, patch, processing, errors } = useFormInertia(defaultValues);

    const form = useForm<CategoryProducts>({
        defaultValues: data,
    });

    function onSubmit(e: FormEvent): void {
        e.preventDefault();

        isUpdate
            ? patch(route('categories.update', category), {
                  preserveScroll: true,
                  onSuccess: () => closeDialog(),
              })
            : post(route('categories.store', cashRegisterModule.slug), {
                  preserveScroll: true,
                  onSuccess: () => closeDialog(),
              });
    }

    return (
        <Form {...form}>
            <form onSubmit={onSubmit} className='space-y-4'>
                <GenericFormField
                    form={form}
                    setData={setData}
                    errors={errors}
                    formData={formDatas}
                />

                <DialogFormFooter
                    closeDialog={closeDialog}
                    processing={processing}
                    buttonAriaLabel={
                        isUpdate
                            ? t('Edit the category of product')
                            : t('Create your category of product')
                    }
                    isUpdate={isUpdate}
                />
            </form>
        </Form>
    );
}
