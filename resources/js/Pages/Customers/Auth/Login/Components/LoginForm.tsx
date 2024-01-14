'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input } from '@/Components/ui/input/input';
import { Button } from '@/Components/ui/button/button';
import { Checkbox } from '@/Components/ui/checkbox/checkbox';
import { CardFooter } from '@/Components/ui/card/cardFooter';
import { Link, useForm as useFormInertia } from '@inertiajs/react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/Components/ui/form/form';

interface FormInput {
    email: string;
    password: string;
    remember: boolean;
}

const defaultValues: FormInput = {
    email: '',
    password: '',
    remember: false,
};

export function LoginForm({ canResetPassword }: { canResetPassword: boolean }): JSX.Element {
    const { t } = useTranslation();

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

        post(route('customers.login'), {
            preserveScroll: true,
            onSuccess: () => reset('password'),
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('Password')}</FormLabel>
                            <FormControl>
                                <Input type='password' {...field} />
                            </FormControl>
                            <FormMessage>{errors.password}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='remember'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='flex items-center'>
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <span className='ml-2'>{t('Remember me')}</span>
                            </FormLabel>
                        </FormItem>
                    )}
                />
                <CardFooter className='mt-4 flex items-center justify-end space-x-4 p-0'>
                    {canResetPassword && (
                        <Button variant={'link'} asChild>
                            <Link href={route('password.request')}>
                                {t('Forgot your password?')}
                            </Link>
                        </Button>
                    )}

                    <Button disabled={processing}>{t('Log in')}</Button>
                </CardFooter>
            </form>
        </Form>
    );
}
