'use client';

import { type FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { Form } from '@/Components/ui/form/form';
import { type Auth } from '@/Shared/Types/AuthTypes';
import { GenericFormField } from './GenericFormField';
import { Button } from '@/Components/ui/button/button';
import { CardFooter } from '@/Components/ui/card/cardFooter';
import { useForm as useFormInertia } from '@inertiajs/react';
import { defaultValues, formDatas } from '@/Shared/Datas/UserPasswordFormDatas';

export function UpdateUserPasswordForm(): JSX.Element {
    const { t } = useTranslation();

    const { data, setData, put, processing, errors, reset, recentlySuccessful } =
        useFormInertia(defaultValues);

    const form = useForm<Auth>({
        defaultValues: data,
    });

    function onSubmit(e: FormEvent): void {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                form.reset();
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
                        <p className='text-sm text-muted-foreground'>{t('Saved.')}</p>
                    </Transition>
                </CardFooter>
            </form>
        </Form>
    );
}
