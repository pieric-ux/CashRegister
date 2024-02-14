'use client';

import { type FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Form } from '@/Components/ui/form/form';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { useForm as useFormInertia, usePage } from '@inertiajs/react';
import DialogFormFooter from '@/Components/forms/Common/DialogFormFooter';
import { GenericFormField } from '@/Components/ui/form/templates/GenericFormField';
import { getDefaultValues, formDatas } from '@/Shared/Datas/Forms/EmployeeProfileFormDatas';

interface PageProps extends InertiaPageProps {
    cashRegisterModule: CashRegister & {
        cr_employees: Employee[];
    };
}

interface EmployeeProfileFormProps {
    employee?: Employee;
    closeDialog: () => void;
    isUpdate?: boolean;
}

export default function EmployeeProfileForm({
    employee,
    closeDialog,
    isUpdate = false,
}: EmployeeProfileFormProps): JSX.Element {
    const { t } = useTranslation();

    const { cashRegisterModule } = usePage<PageProps>().props;

    const defaultValues = getDefaultValues(employee);

    const { data, setData, post, patch, processing, errors } = useFormInertia(defaultValues);

    const form = useForm<Employee>({
        defaultValues: data,
    });

    function onSubmit(e: FormEvent): void {
        e.preventDefault();

        isUpdate
            ? patch(route('employees.update', employee?.id), {
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
