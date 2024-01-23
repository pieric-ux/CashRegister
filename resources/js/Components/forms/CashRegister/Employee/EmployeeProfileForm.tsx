'use client';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Form } from '@/Components/ui/form/form';
import { useContext, type FormEvent } from 'react';
import { useForm as useFormInertia } from '@inertiajs/react';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import DialogFormFooter from '@/Components/forms/Common/DialogFormFooter';
import { GenericFormField } from '@/Components/ui/form/templates/GenericFormField';
import { CashRegisterConfigurationsContext } from '@/Context/CashRegisterModulesContext';
import { getDefaultValues, formDatas } from '@/Shared/Datas/Forms/EmployeeProfileFormDatas';

export function EmployeeProfileForm({
    employee,
    closeDialog,
    isUpdate = false,
}: {
    employee?: Employee;
    closeDialog: () => void;
    isUpdate?: boolean;
}): JSX.Element {
    const { t } = useTranslation();

    const { cashRegisterModule } = useContext(CashRegisterConfigurationsContext);

    const defaultValues = getDefaultValues(employee, isUpdate);

    const { data, setData, post, patch, processing, errors } = useFormInertia(defaultValues);

    const form = useForm<Employee>({
        defaultValues: data,
    });

    function onSubmit(e: FormEvent): void {
        e.preventDefault();

        isUpdate
            ? patch(route('employees.update', employee), {
                  preserveScroll: true,
                  onSuccess: () => closeDialog(),
              })
            : post(route('employees.register', cashRegisterModule.slug), {
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
                    buttonAriaLabel={isUpdate ? t('Edit your employee') : t('Create your employee')}
                    isUpdate={isUpdate}
                />
            </form>
        </Form>
    );
}
