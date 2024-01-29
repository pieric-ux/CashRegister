'use client';

import { type FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Form } from '@/Components/ui/form/form';
import { type Auth } from '@/Shared/Types/AuthTypes';
import { Button } from '@/Components/ui/button/button';
import { CardFooter } from '@/Components/ui/card/cardFooter';
import { useForm as useFormInertia } from '@inertiajs/react';
import { GenericFormField } from '@/Components/ui/form/templates/GenericFormField';
import { getDefaultValues, formDatas } from '@/Shared/Datas/Forms/Auth/ResetPasswordFormDatas';

interface ResetPasswordFormProps {
    token: string;
    email: string;
}

export default function ResetPasswordForm({ token, email }: ResetPasswordFormProps): JSX.Element {
    const { t } = useTranslation();

    const defaultValues = getDefaultValues({ token, email });

    const { data, setData, post, processing, errors, reset } = useFormInertia(defaultValues);

    const form = useForm<Auth>({
        defaultValues: data,
    });

    function onSubmit(e: FormEvent): void {
        e.preventDefault();

        post(route('password.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset('password', 'password_confirmation');
                form.reset({ password: '', password_confirmation: '' });
            },
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={onSubmit}>
                {formDatas.map((formData) => (
                    <GenericFormField
                        key={formData.name}
                        form={form}
                        setData={setData}
                        errors={errors}
                        formData={formData}
                    />
                ))}
                <CardFooter className='mt-4 flex items-center justify-end p-0'>
                    <Button disabled={processing}>{t('Reset Password')}</Button>
                </CardFooter>
            </form>
        </Form>
    );
}
