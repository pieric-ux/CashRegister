'use client';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Form } from '@/Components/ui/form/form';
import { useContext, type FormEvent } from 'react';
import { useForm as useFormInertia } from '@inertiajs/react';
import DialogFormFooter from '../../Common/DialogFormFooter';
import { type Workstation } from '@/Shared/Types/WorkstationTypes';
import { GenericFormField } from '@/Components/ui/form/templates/GenericFormField';
import { getDefaultValues, formDatas } from '@/Shared/Datas/Forms/WorkstationInfosFormDatas';
import { CashRegisterConfigurationsContext } from '@/Context/CashRegisterModulesContext';

interface WorkstationInfosFormProps {
    workstation?: Workstation;
    closeDialog: () => void;
    isUpdate?: boolean;
}

export default function WorkstationInfosForm({
    workstation,
    closeDialog,
    isUpdate = false,
}: WorkstationInfosFormProps): JSX.Element {
    const { t } = useTranslation();

    const { cashRegisterModule } = useContext(CashRegisterConfigurationsContext);

    const defaultValues = getDefaultValues(workstation, isUpdate);

    const { data, setData, post, patch, processing, errors } = useFormInertia(defaultValues);

    const form = useForm<Workstation>({
        defaultValues: data,
    });

    function onSubmit(e: FormEvent): void {
        e.preventDefault();

        isUpdate
            ? patch(route('workstations.update', workstation), {
                  preserveScroll: true,
                  onSuccess: () => closeDialog(),
              })
            : post(route('workstations.store', cashRegisterModule.slug), {
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
                        isUpdate ? t('Edit the workstation') : t('Create a Workstation')
                    }
                    isUpdate={isUpdate}
                />
            </form>
        </Form>
    );
}
