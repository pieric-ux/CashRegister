'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input } from '@/Components/ui/input/input';
import { Button } from '@/Components/ui/button/button';
import { useForm as useFormInertia } from '@inertiajs/react';
import { DialogClose, DialogFooter } from '../ui/dialog/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/Components/ui/form/form';
import { Checkbox } from '../ui/checkbox/checkbox';

interface FormInput {
    name: string;
    unit: string;
    client_price: string;
    cost_price: string;
    is_consigned: boolean;
    is_SoldSeparately: boolean;
}

export function DishInfosForm({
    application,
    dish,
    closeDialog,
    isUpdate = false,
}: {
    application?: any;
    dish?: any; // FIXME: type application & dish
    closeDialog: () => void;
    isUpdate?: boolean;
}): JSX.Element {
    const { t } = useTranslation();

    const defaultValues: FormInput = {
        name: isUpdate ? dish.name : '',
        unit: isUpdate ? dish.unit : '',
        client_price: isUpdate ? dish.client_price : '',
        cost_price: isUpdate ? dish.cost_price : '',
        is_consigned: isUpdate ? dish.is_consigned : true,
        is_SoldSeparately: isUpdate ? dish.is_SoldSeparately : false,
    };

    const { data, setData, post, patch, processing, errors, reset } = useFormInertia(defaultValues);

    const form = useForm<FormInput>({
        defaultValues: data,
    });

    useEffect(() => {
        // FIXME: don't use useEffect to changing data with setData
        setData(form.getValues());
    }, [form.getValues(), setData]);

    function onSubmit(values: FormInput): void {
        setData(values);
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
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('Name')}</FormLabel>
                            <FormControl>
                                <Input isFocused={true} {...field} />
                            </FormControl>
                            <FormMessage>{errors.name}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='unit'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('Unit')}</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage>{errors.unit}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='client_price'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('Client Price')}</FormLabel>
                            <FormControl>
                                <Input disabled={!data.is_consigned} {...field} />
                            </FormControl>
                            <FormMessage>{errors.client_price}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='cost_price'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('Cost Price')}</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage>{errors.cost_price}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='is_consigned'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='flex items-center'>
                                <FormControl>
                                    <Checkbox
                                        checked={field.value} // FIXME: checkbox icon
                                        onCheckedChange={field.onChange}
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
                                        checked={field.value} // FIXME: checkbox icon
                                        onCheckedChange={field.onChange}
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
