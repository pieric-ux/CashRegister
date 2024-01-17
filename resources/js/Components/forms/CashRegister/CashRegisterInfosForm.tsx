'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input } from '@/Components/ui/input/input';
import { Button } from '@/Components/ui/button/button';
import { useForm as useFormInertia } from '@inertiajs/react';
import { DialogClose, DialogFooter } from '@/Components/ui/dialog/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/Components/ui/form/form';

interface FormInput {
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    location: string;
    website: string;
}

export function CashRegisterInfosForm({
    application,
    closeDialog,
    isUpdate = false,
}: {
    application?: any; // TODO: type application
    closeDialog: () => void;
    isUpdate?: boolean;
}): JSX.Element {
    const { t } = useTranslation();

    const defaultValues: FormInput = {
        name: isUpdate ? application.name : '',
        description: isUpdate ? application.description : '',
        start_date: isUpdate ? application.start_date : '',
        end_date: isUpdate ? application.end_date : '',
        location: isUpdate ? application.location : '',
        website: isUpdate ? application.website : '',
    };

    const { data, setData, post, patch, processing, errors } = useFormInertia(defaultValues);

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
            ? patch(route('applications.update', application.slug), {
                  preserveScroll: true,
                  onSuccess: () => closeDialog(),
              })
            : post(route('applications.store'), {
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
                    name='description'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('Description')}</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage>{errors.description}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='start_date'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('Start Date')}</FormLabel>
                            <FormControl>
                                <Input type='date' {...field} />
                            </FormControl>
                            <FormMessage>{errors.start_date}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='end_date'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('End Date')}</FormLabel>
                            <FormControl>
                                <Input type='date' {...field} />
                            </FormControl>
                            <FormMessage>{errors.end_date}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='location'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('Location')}</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage>{errors.location}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='website'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('Website')}</FormLabel>
                            <FormControl>
                                <Input placeholder='https://' pattern='https://.*' {...field} />
                            </FormControl>
                            <FormMessage>{errors.website}</FormMessage>
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
                        aria-label={isUpdate ? t('Edit your app') : t('Create your app')}
                    >
                        {isUpdate ? t('Save') : t('Create')}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
