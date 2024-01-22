'use client';
// TODO: Maybe refactor with WorkstationInfosForm
import { useContext, type FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Form } from '@/Components/ui/form/form';
import { Button } from '@/Components/ui/button/button';
import { useForm as useFormInertia } from '@inertiajs/react';
import { DialogClose, DialogFooter } from '@/Components/ui/dialog/dialog';
import { type CategoryProducts } from '@/Shared/Types/CategoryProductsTypes';
import { GenericFormField } from '@/Components/ui/form/templates/GenericFormField';
import { CashRegisterConfigurationsContext } from '@/Context/CashRegisterModulesContext';
import { getDefaultValues, formDatas } from '@/Shared/Datas/Forms/CategoryProductsInfosFormDatas';

export function CategoryProductsInfosForm({
    category,
    closeDialog,
    isUpdate = false,
}: {
    category?: CategoryProducts; // TODO: type category
    closeDialog: () => void;
    isUpdate?: boolean;
}): JSX.Element {
    const { t } = useTranslation();

    const { cashRegisterModule } = useContext(CashRegisterConfigurationsContext);

    const defaultValues = getDefaultValues(category, isUpdate);

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
            <form onSubmit={onSubmit}>
                <GenericFormField
                    form={form}
                    setData={setData}
                    errors={errors}
                    formData={formDatas}
                />

                <DialogFooter className='mt-6 flex justify-end'>
                    <DialogClose asChild>
                        <Button variant={'secondary'} onClick={closeDialog}>
                            {t('Cancel')}
                        </Button>
                    </DialogClose>

                    <Button
                        className='ml-3'
                        disabled={processing}
                        aria-label={
                            isUpdate
                                ? t('Edit the category of product')
                                : t('Create your category of product')
                        }
                    >
                        {isUpdate ? t('Save') : t('Create')}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
