'use client';

import { type FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { Form } from '@/Components/ui/form/form';
import { Button } from '@/Components/ui/button/button';
import { CardFooter } from '@/Components/ui/card/cardFooter';
import { GenericFormField } from '../Common/GenericFormField';
import { Link, useForm as useFormInertia } from '@inertiajs/react';
import { formDatas, getDefaultValues } from '@/Shared/Datas/CustomerProfileFormData';
import { type Customer, type CustomerProfileFormInput } from '@/Shared/Types/customerTypes';

export function CustomerProfileForm({
    customer,
    isUpdate = false,
}: {
    customer: Customer;
    isUpdate?: boolean;
}): JSX.Element {
    const { t } = useTranslation();

    const defaultValues = getDefaultValues(customer, isUpdate);

    const { data, setData, post, patch, processing, errors, reset, recentlySuccessful } =
        useFormInertia(defaultValues);

    const form = useForm<CustomerProfileFormInput>({
        defaultValues: data,
    });

    function onSubmit(e: FormEvent): void {
        e.preventDefault();

        isUpdate
            ? patch(route('profile.update'))
            : post(route('customers.register'), {
                  onSuccess: () => {
                      reset('password', 'password_confirmation');
                      form.reset({ password: '', password_confirmation: '' });
                  },
              });
    }

    return (
        <Form {...form}>
            <form onSubmit={onSubmit}>
                {formDatas.base.map((formData) => (
                    <GenericFormField
                        key={formData.name}
                        form={form}
                        setData={setData}
                        errors={errors}
                        formData={formData}
                    />
                ))}

                {formDatas.flex !== undefined && formDatas.flex !== null && (
                    <div className='flex gap-4'>
                        {formDatas.flex.map((formData) => (
                            <GenericFormField
                                key={formData.name}
                                form={form}
                                setData={setData}
                                errors={errors}
                                formData={formData}
                            />
                        ))}
                    </div>
                )}

                {isUpdate &&
                    formDatas.update?.map((formData) => (
                        <GenericFormField
                            key={formData.name}
                            form={form}
                            setData={setData}
                            errors={errors}
                            formData={formData}
                        />
                    ))}

                {formDatas.end !== undefined && formDatas.end !== null && (
                    <GenericFormField
                        form={form}
                        setData={setData}
                        errors={errors}
                        formData={formDatas.end}
                    />
                )}

                {!isUpdate &&
                    formDatas.create?.map((formData) => (
                        <GenericFormField
                            key={formData.name}
                            form={form}
                            setData={setData}
                            errors={errors}
                            formData={formData}
                        />
                    ))}

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
                    <CardFooter className='mt-4 flex items-center justify-end p-0'>
                        <Button variant={'link'} asChild>
                            <Link href={route('customers.login')}>{t('Already registered?')}</Link>
                        </Button>
                        <Button disabled={processing}>{t('Register')}</Button>
                    </CardFooter>
                )}
            </form>
        </Form>
    );
}
