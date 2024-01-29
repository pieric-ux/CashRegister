'use client';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useContext, type FormEvent } from 'react';
import { type Dish } from '@/Shared/Types/DishTypes';
import { useForm as useFormInertia } from '@inertiajs/react';
import { Checkbox } from '@/Components/ui/checkbox/checkbox';
import DialogFormFooter from '@/Components/forms/Common/DialogFormFooter';
import { GenericFormField } from '@/Components/ui/form/templates/GenericFormField';
import { getDefaultValues, formDatas } from '@/Shared/Datas/Forms/DishInfosFormDatas';
import { CashRegisterConfigurationsContext } from '@/Context/CashRegisterModulesContext';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/Components/ui/form/form';

interface DishInfosFormProps {
    dish?: Dish;
    closeDialog: () => void;
    isUpdate?: boolean;
}

export default function DishInfosForm({
    dish,
    closeDialog,
    isUpdate = false,
}: DishInfosFormProps): JSX.Element {
    const { t } = useTranslation();

    const { cashRegisterModule } = useContext(CashRegisterConfigurationsContext);

    const defaultValues = getDefaultValues(dish, isUpdate);

    const { data, setData, post, patch, processing, errors } = useFormInertia(defaultValues);

    const form = useForm<Dish>({
        defaultValues: data,
    });

    function onSubmit(e: FormEvent): void {
        e.preventDefault();

        isUpdate
            ? patch(route('dishes.update', dish), {
                  preserveScroll: true,
                  onSuccess: () => closeDialog(),
              })
            : post(route('dishes.store', cashRegisterModule.slug), {
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
                        data={data}
                        setData={setData}
                        errors={errors}
                        formData={formData}
                    />
                ))}
                <FormField
                    control={form.control}
                    name='is_consigned'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='flex items-center'>
                                <FormControl>
                                    <Checkbox
                                        defaultChecked={field.value}
                                        onCheckedChange={(isChecked) => {
                                            field.onChange(isChecked);
                                            setData('is_consigned', isChecked as boolean);
                                        }}
                                    />
                                </FormControl>
                                <span className='ml-2'>{t('Consigned')}</span>
                            </FormLabel>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='is_soldSeparately'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='flex items-center'>
                                <FormControl>
                                    <Checkbox
                                        defaultChecked={field.value}
                                        onCheckedChange={(isChecked) => {
                                            field.onChange(isChecked);
                                            setData('is_soldSeparately', isChecked as boolean);
                                        }}
                                    />
                                </FormControl>
                                <span className='ml-2'>{t('Sold Separately')}</span>
                            </FormLabel>
                        </FormItem>
                    )}
                />

                <DialogFormFooter
                    closeDialog={closeDialog}
                    processing={processing}
                    buttonAriaLabel={isUpdate ? t('Edit the dish') : t('Create your dish')}
                    isUpdate={isUpdate}
                />
            </form>
        </Form>
    );
}
