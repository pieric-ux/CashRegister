'use client';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Form } from '@/Components/ui/form/form';
import { useContext, type FormEvent } from 'react';
import { useForm as useFormInertia } from '@inertiajs/react';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import DialogFormFooter from '@/Components/forms/Common/DialogFormFooter';
import { GenericFormField } from '@/Components/ui/form/templates/GenericFormField';
import { ShowCashRegisterInfosContext } from '@/Context/CashRegisterModulesContext';
import { getDefaultValues, formDatas } from '@/Shared/Datas/Forms/CashRegisterInfosFormDatas';

interface CashRegisterInfosFormProps {
    closeDialog: () => void;
    isUpdate?: boolean;
}

export default function CashRegisterInfosForm({
    closeDialog,
    isUpdate = false,
}: CashRegisterInfosFormProps): JSX.Element {
    const { t } = useTranslation();

    const { cashRegisterModule } = useContext(ShowCashRegisterInfosContext);

    const defaultValues = getDefaultValues(cashRegisterModule, isUpdate);

    const { data, setData, post, patch, processing, errors } = useFormInertia(defaultValues);

    const form = useForm<CashRegister>({
        defaultValues: data,
    });

    function onSubmit(e: FormEvent): void {
        e.preventDefault();

        isUpdate
            ? patch(route('cashregisters.update', cashRegisterModule.slug), {
                  preserveScroll: true,
                  onSuccess: () => closeDialog(),
              })
            : post(route('cashregisters.store'), {
                  preserveScroll: true,
                  onSuccess: () => closeDialog(),
              });
    }

    return (
        <Form {...form}>
            <form onSubmit={onSubmit} className='space-y-4'>
                {formDatas.map((formData) => (
                    <GenericFormField
                        key={formData.name}
                        form={form}
                        setData={setData}
                        errors={errors}
                        formData={formData}
                    />
                ))}

                <DialogFormFooter
                    closeDialog={closeDialog}
                    processing={processing}
                    buttonAriaLabel={isUpdate ? t('Edit your app') : t('Create your app')}
                    isUpdate={isUpdate}
                />
            </form>
        </Form>
    );
}
