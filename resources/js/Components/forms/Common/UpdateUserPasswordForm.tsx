'use client';

import { type FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/Components/ui/input/input';
import { Button } from '@/Components/ui/button/button';
import { CardFooter } from '@/Components/ui/card/cardFooter';
import { useForm as useFormInertia } from '@inertiajs/react';
import { defaultValues, formDatas } from '@/Shared/Datas/UserPasswordFormDatas';
import { type UserPasswordFormInput } from '@/Shared/Types/UserPasswordFormTypes';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/Components/ui/form/form';

export function UpdateUserPasswordForm(): JSX.Element {
    const { t } = useTranslation();

    const { data, setData, put, processing, errors, reset, recentlySuccessful } =
        useFormInertia(defaultValues);

    const form = useForm<UserPasswordFormInput>({
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
                    <FormField
                        key={formData.name}
                        control={form.control}
                        name={formData.name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t(formData.label)}</FormLabel>
                                <FormControl>
                                    <Input
                                        type={formData.type}
                                        autoComplete={formData.autoComplete}
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setData(formData.name, e.target.value);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage>{errors[formData.name]}</FormMessage>
                            </FormItem>
                        )}
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
