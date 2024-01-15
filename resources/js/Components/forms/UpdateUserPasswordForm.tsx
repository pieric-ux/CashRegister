'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/Components/ui/input/input';
import { Button } from '@/Components/ui/button/button';
import { CardFooter } from '@/Components/ui/card/cardFooter';
import { useForm as useFormInertia } from '@inertiajs/react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/Components/ui/form/form';

interface FormInput {
    current_password: string;
    password: string;
    password_confirmation: string;
}

const defaultValues: FormInput = {
    current_password: '',
    password: '',
    password_confirmation: '',
};

export function UpdateUserPasswordForm(): JSX.Element {
    const { t } = useTranslation();

    const { data, setData, put, processing, errors, reset, recentlySuccessful } =
        useFormInertia(defaultValues);

    const form = useForm<FormInput>({
        defaultValues: data,
    });

    useEffect(() => {
        // FIXME: don't use useEffect to changing data with setData
        setData(form.getValues());
    }, [form.getValues(), setData]);

    function onSubmit(values: FormInput): void {
        setData(values);

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name='current_password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('Current Password')}</FormLabel>
                            <FormControl>
                                <Input type='password' autoComplete='current-password' {...field} />
                            </FormControl>
                            <FormMessage>{errors.current_password}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('New Password')}</FormLabel>
                            <FormControl>
                                <Input type='password' autoComplete='new-password' {...field} />
                            </FormControl>
                            <FormMessage>{errors.password}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password_confirmation'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('Confirm Password')}</FormLabel>
                            <FormControl>
                                <Input type='password' autoComplete='new-password' {...field} />
                            </FormControl>
                            <FormMessage>{errors.password_confirmation}</FormMessage>
                        </FormItem>
                    )}
                />

                <CardFooter className='mt-4 flex items-center gap-4 p-0'>
                    <Button disabled={processing} aria-label={t('Save your updated password')}>
                        {t('Save')}
                    </Button>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom='opacity-0'
                        leaveTo='opacity-0'
                        className='transition ease-in-out'
                    >
                        <p className='text-sm text-muted'>{t('Saved.')}</p>
                    </Transition>
                </CardFooter>
            </form>
        </Form>
    );
}
