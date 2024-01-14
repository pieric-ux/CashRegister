'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input } from '@/Components/ui/input/input';
import { Button } from '@/Components/ui/button/button';
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
    company_name: string;
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    npa: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const defaultValues: FormInput = {
    company_name: '',
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    npa: '',
    email: '',
    password: '',
    password_confirmation: '',
};

export function RegisterForm(): JSX.Element {
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

        post(route('customers.register'), {
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
                    name='company_name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {t('Company Name')} <small>({t('facultative')})</small>
                            </FormLabel>
                            <FormControl>
                                <Input isFocused={true} autoComplete='organization' {...field} />
                            </FormControl>
                            <FormMessage>{errors.company_name}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='first_name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('First Name')}</FormLabel>
                            <FormControl>
                                <Input autoComplete='given-name' {...field} />
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
                                <Input autoComplete='family-name' {...field} />
                            </FormControl>
                            <FormMessage>{errors.last_name}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='address'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('Address')}</FormLabel>
                            <FormControl>
                                <Input autoComplete='street-address' {...field} />
                            </FormControl>
                            <FormMessage>{errors.address}</FormMessage>
                        </FormItem>
                    )}
                />
                <div className='flex gap-4'>
                    <FormField
                        control={form.control}
                        name='city'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('City')}</FormLabel>
                                <FormControl>
                                    <Input autoComplete='address-level2' {...field} />
                                </FormControl>
                                <FormMessage>{errors.city}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='npa'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('NPA')}</FormLabel>
                                <FormControl>
                                    <Input autoComplete='postal-code' {...field} />
                                </FormControl>
                                <FormMessage>{errors.npa}</FormMessage>
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('Email')}</FormLabel>
                            <FormControl>
                                <Input type='email' autoComplete='username' {...field} />
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
                    <Button variant={'link'} asChild>
                        <Link href={route('customers.login')}>{t('Already registered?')}</Link>
                    </Button>
                    <Button disabled={processing}>{t('Register')}</Button>
                </CardFooter>
            </form>
        </Form>
    );
}
