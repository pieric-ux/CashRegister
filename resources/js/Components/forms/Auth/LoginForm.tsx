'use client';

import { type FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
import { Checkbox } from '@/Components/ui/checkbox/checkbox';
import { CardFooter } from '@/Components/ui/card/cardFooter';
import { type CashRegister } from '@/Shared/Types/CashRegisterTypes';
import { type LoginFormDatas, type Auth } from '@/Shared/Types/AuthTypes';
import { Link, useForm as useFormInertia, usePage } from '@inertiajs/react';
import { GenericFormField } from '@/Components/ui/form/templates/GenericFormField';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/Components/ui/form/form';

interface PageProps extends InertiaPageProps {
    canResetPassword: boolean;
}

interface LoginFormProps {
    defaultValues: Auth;
    formDatas: LoginFormDatas[];
    cashRegisterModule?: CashRegister;
    isEmployee?: boolean;
}

export default function LoginForm({
    defaultValues,
    formDatas,
    cashRegisterModule,
    isEmployee = false,
}: LoginFormProps): JSX.Element {
    const { t } = useTranslation();
    const { canResetPassword } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors, reset } = useFormInertia(defaultValues);

    const form = useForm<Auth>({
        defaultValues: data,
    });

    function onSubmit(e: FormEvent): void {
        e.preventDefault();

        isEmployee
            ? post(route('employees.login', cashRegisterModule?.slug), {
                  preserveScroll: true,
                  onSuccess: () => {
                      reset('passwordless');
                      form.reset({ passwordless: '' });
                  },
              })
            : post(route('customers.login'), {
                  preserveScroll: true,
                  onSuccess: () => {
                      reset('password');
                      form.reset({ password: '' });
                  },
              });
    }

    return (
        <Form {...form}>
            <form onSubmit={onSubmit} className='space-y-4'>
                {formDatas.map((formData) => (
                    <GenericFormField
                        key={formData.name}
                        form={form}
                        setData={setData}
                        errors={errors}
                        formData={formData}
                    />
                ))}
                <FormField
                    control={form.control}
                    name='remember'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='flex items-center'>
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={(isChecked) => {
                                            field.onChange(isChecked);
                                            setData('remember', isChecked as boolean);
                                        }}
                                    />
                                </FormControl>
                                <span className='ml-2'>{t('Remember me')}</span>
                            </FormLabel>
                        </FormItem>
                    )}
                />
                <CardFooter className='mt-4 flex items-center justify-end space-x-4 p-0'>
                    {canResetPassword && isEmployee && (
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
