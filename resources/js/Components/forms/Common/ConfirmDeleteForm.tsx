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

interface FormInput {
    password: string;
}

const defaultValues: FormInput = {
    password: '',
};

export function ConfirmDeleteForm({ route, closeDialog, ariaLabel, buttonTiltle }): JSX.Element {
    const { t } = useTranslation();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        errors,
        reset,
    } = useFormInertia(defaultValues);

    const form = useForm<FormInput>({
        defaultValues: data,
    });

    useEffect(() => {
        // FIXME: don't use useEffect to changing data with setData
        setData(form.getValues());
    }, [form.getValues(), setData]);

    function onSubmit(values: FormInput): void {
        setData(values);

        destroy(route, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                closeDialog();
            },
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
                            <FormLabel className='sr-only'>{t('Password')}</FormLabel>
                            <FormControl>
                                <Input
                                    type='password'
                                    isFocused={true}
                                    autoComplete='current-password'
                                    placeholder={t('password')}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{errors.password}</FormMessage>
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
                        variant={'destructive'}
                        disabled={processing}
                        aria-label={ariaLabel}
                    >
                        {buttonTiltle}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
