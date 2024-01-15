'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
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
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export function ResetPasswordForm({ token, email }: { token: string; email: string }): JSX.Element {
    const { t } = useTranslation();

    const defaultValues: FormInput = {
        token,
        email,
        password: '',
        password_confirmation: '',
    };

    const { data, setData, post, processing, errors, reset } = useFormInertia(defaultValues);

    const form = useForm<FormInput>({
        defaultValues: data,
    });

    useEffect(() => {
        // FIXME: don't use useEffect to changing data with setData
        setData(form.getValues());
    }, [form.getValues(), setData]);

    function onSubmit(values: FormInput): void {
        setData(values);

        post(route('password.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset('password', 'password_confirmation');
            },
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('Email')}</FormLabel>
                            <FormControl>
                                <Input
                                    type='email'
                                    isFocused={true}
                                    autoComplete='username'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{errors.email}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('Password')}</FormLabel>
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
                                <Input type='password' {...field} />
                            </FormControl>
                            <FormMessage>{errors.password_confirmation}</FormMessage>
                        </FormItem>
                    )}
                />
                <CardFooter className='mt-4 flex items-center justify-end p-0'>
                    <Button disabled={processing}>{t('Reset Password')}</Button>
                </CardFooter>
            </form>
        </Form>
    );
}
