'use client';

import { type FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Form } from '@/Components/ui/form/form';
import { Button } from '@/Components/ui/button/button';
import { useForm as useFormInertia } from '@inertiajs/react';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import { DialogClose, DialogFooter } from '@/Components/ui/dialog/dialog';
import { GenericFormField } from '@/Components/ui/form/templates/GenericFormField';
import { getDefaultValues, formDatas } from '@/Shared/Datas/Forms/EmployeeProfileFormData';

export function EmployeeProfileForm({
    application,
    employee,
    closeDialog,
    isUpdate = false,
}: {
    application?: any; // TODO: type application
    employee?: any; // TODO: type employee
    closeDialog: () => void;
    isUpdate?: boolean;
}): JSX.Element {
    const { t } = useTranslation();

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
            : post(route('employees.register', application.slug), {
                  preserveScroll: true,
                  onSuccess: () => closeDialog(),
              });
    }

    return (
        <Form {...form}>
            <form onSubmit={onSubmit}>
                {formDatas.map((formData) => (
                    <GenericFormField
                        key={formData.name}
                        form={form}
                        setData={setData}
                        errors={errors}
                        formData={formData}
                    />
                ))}

                <DialogFooter className='mt-6 flex justify-end'>
                    <DialogClose asChild>
                        <Button variant={'secondary'} onClick={closeDialog}>
                            {t('Cancel')}
                        </Button>
                    </DialogClose>

                    <Button
                        className='ml-3'
                        disabled={processing}
                        aria-label={isUpdate ? t('Edit your employee') : t('Create your employee')}
                    >
                        {isUpdate ? t('Save') : t('Create')}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
