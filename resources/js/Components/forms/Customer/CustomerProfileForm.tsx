'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Transition } from '@headlessui/react';
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
    phone: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export function CustomerProfileForm({
    customer,
    isUpdate = false,
}: {
    customer?: any; // TODO: type customer
    isUpdate?: boolean;
}): JSX.Element {
    const { t } = useTranslation();

    const defaultValues: FormInput = {
        company_name: isUpdate ? customer.company_name : '',
        first_name: isUpdate ? customer.first_name : '',
        last_name: isUpdate ? customer.last_name : '',
        address: isUpdate ? customer.address : '',
        city: isUpdate ? customer.city : '',
        npa: isUpdate ? customer.npa : '',
        phone: isUpdate ? customer.phone : '',
        email: isUpdate ? customer.email : '',
        password: '',
        password_confirmation: '',
    };

    const { data, setData, post, patch, processing, errors, reset, recentlySuccessful } =
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

        isUpdate
            ? patch(route('profile.update'))
            : post(route('customers.register'), {
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
                {isUpdate && (
                    <FormField
                        control={form.control}
                        name='phone'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('Phone')}</FormLabel>
                                <FormControl>
                                    <Input type='tel' autoComplete='tel' {...field} />
                                </FormControl>
                                <FormMessage>{errors.phone}</FormMessage>
                            </FormItem>
                        )}
                    />
                )}
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
                {isUpdate ? (
                    <CardFooter className='mt-4 flex items-center gap-4 p-0'>
                        <Button
                            disabled={processing}
                            aria-label={t('Save your profile information')}
                        >
                            {t('Save')}
                        </Button>

                        <Transition
                            show={recentlySuccessful}
                            enterFrom='opacity-0'
                            leaveTo='opacity-0'
                            className='transition ease-in-out'
                        >
                            <p className='text-sm text-muted-foreground'>{t('Saved.')}</p>
                        </Transition>
                    </CardFooter>
                ) : (
                    <>
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('Password')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='password'
                                            autoComplete='new-password'
                                            {...field}
                                        />
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
                                <Link href={route('customers.login')}>
                                    {t('Already registered?')}
                                </Link>
                            </Button>
                            <Button disabled={processing}>{t('Register')}</Button>
                        </CardFooter>
                    </>
                )}
            </form>
        </Form>
    );
}
