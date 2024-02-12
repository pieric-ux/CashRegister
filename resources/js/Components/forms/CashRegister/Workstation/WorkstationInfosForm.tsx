'use client';

import { type FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Form } from '@/Components/ui/form/form';
import { type Product } from '@/Shared/Types/ProductTypes';
import DialogFormFooter from '../../Common/DialogFormFooter';
import { type Employee } from '@/Shared/Types/EmployeeTypes';
import { type Workstation } from '@/Shared/Types/WorkstationTypes';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { useForm as useFormInertia, usePage } from '@inertiajs/react';
import { GenericFormField } from '@/Components/ui/form/templates/GenericFormField';
import { getDefaultValues, formDatas } from '@/Shared/Datas/Forms/WorkstationInfosFormDatas';

interface PageProps extends InertiaPageProps {
    cashRegisterModule: CashRegister & {
        cr_workstations: Workstation[] & {
            cr_employees: Employee[];
            cr_products: Product[];
            generalProducts: Product[];
        };
    };
}

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
    const { cashRegisterModule } = usePage<PageProps>().props;

    const defaultValues = getDefaultValues(workstation, isUpdate); // FIXME: check type with Flavien

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
