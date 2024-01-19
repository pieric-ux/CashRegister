'use client';

import { type FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Form } from '@/Components/ui/form/form';
import { type Auth } from '@/Shared/Types/AuthTypes';
import { Button } from '@/Components/ui/button/button';
import { CardFooter } from '@/Components/ui/card/cardFooter';
import { useForm as useFormInertia } from '@inertiajs/react';
import { GenericFormField } from '../Common/GenericFormField';
import { defaultValues, formDatas } from '@/Shared/Datas/Forms/Auth/ConfirmPasswordFormDatas';

export function ConfirmPasswordForm(): JSX.Element {
    const { t } = useTranslation();

    const { data, setData, post, processing, errors, reset } = useFormInertia(defaultValues);

    const form = useForm<Auth>({
        defaultValues: data,
    });

    function onSubmit(e: FormEvent): void {
        e.preventDefault();

        post(route('password.confirm'), {
            preserveScroll: true,
            onSuccess: () => {
                reset('password');
                form.reset({ password: '' });
            },
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={onSubmit}>
                <GenericFormField
                    form={form}
                    setData={setData}
                    errors={errors}
                    formData={formDatas}
                />

                <CardFooter className='mt-4 flex items-center justify-end p-0'>
                    <Button disabled={processing}>{t('Confirm')}</Button>
                </CardFooter>
            </form>
        </Form>
    );
}
