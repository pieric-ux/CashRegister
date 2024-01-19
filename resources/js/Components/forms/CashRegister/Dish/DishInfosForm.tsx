'use client';

import { type FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { type Dish } from '@/Shared/Types/DishTypes';
import { Button } from '@/Components/ui/button/button';
import { useForm as useFormInertia } from '@inertiajs/react';
import { Checkbox } from '@/Components/ui/checkbox/checkbox';
import { GenericFormField } from '../../Common/GenericFormField';
import { DialogClose, DialogFooter } from '@/Components/ui/dialog/dialog';
import { getDefaultValues, formDatas } from '@/Shared/Datas/Forms/DishInfosFormDatas';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/Components/ui/form/form';

export function DishInfosForm({
    application,
    dish,
    closeDialog,
    isUpdate = false,
}: {
    application?: any; // TODO: type dish
    dish?: any; // TODO: type dish
    closeDialog: () => void;
    isUpdate?: boolean;
}): JSX.Element {
    const { t } = useTranslation();

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
            : post(route('dishes.store', application.slug), {
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
                                            setData('is_consigned', isChecked);
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
                    name='is_SoldSeparately'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='flex items-center'>
                                <FormControl>
                                    <Checkbox
                                        defaultChecked={field.value}
                                        onCheckedChange={(isChecked) => {
                                            field.onChange(isChecked);
                                            setData('is_SoldSeparately', isChecked);
                                        }}
                                    />
                                </FormControl>
                                <span className='ml-2'>{t('Sold Separately')}</span>
                            </FormLabel>
                        </FormItem>
                    )}
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
                        aria-label={isUpdate ? t('Edit the dish') : t('Create your dish')}
                    >
                        {isUpdate ? t('Save') : t('Create')}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
