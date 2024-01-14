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
    password: string;
}

const defaultValues: FormInput = {
    password: '',
};

export function ConfirmPasswordForm(): JSX.Element {
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

        post(route('password.confirm'), {
            preserveScroll: true,
            onSuccess: () => reset('password'),
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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

                <CardFooter className='mt-4 flex items-center justify-end p-0'>
                    <Button disabled={processing}>{t('Confirm')}</Button>
                </CardFooter>
            </form>
        </Form>
    );
}
