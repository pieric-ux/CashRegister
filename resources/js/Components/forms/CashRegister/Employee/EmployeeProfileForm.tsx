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
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
}

export function EmployeeProfileForm({
    application,
    employee,
    closeDialog,
    isUpdate = false,
}: {
    application?: any; // FIXME: type application
    employee?: any; // FIXME: type employee
    closeDialog: () => void;
    isUpdate?: boolean;
}): JSX.Element {
    const { t } = useTranslation();

    const defaultValues: FormInput = {
        first_name: isUpdate ? employee.first_name : '',
        last_name: isUpdate ? employee.last_name : '',
        phone: isUpdate ? employee.phone : '',
        email: isUpdate ? employee.email : '',
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
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name='first_name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('First Name')}</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage>{errors.first_name}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='last_name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('Last Name')}</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage>{errors.last_name}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='phone'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('Phone')}</FormLabel>
                            <FormControl>
                                <Input type='tel' {...field} />
                            </FormControl>
                            <FormMessage>{errors.phone}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('Email')}</FormLabel>
                            <FormControl>
                                <Input type='email' {...field} />
                            </FormControl>
                            <FormMessage>{errors.email}</FormMessage>
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
                        aria-label={isUpdate ? t('Edit your employee') : t('Create your employee')}
                    >
                        {isUpdate ? t('Save') : t('Create')}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
