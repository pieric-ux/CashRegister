import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';

export default function ForgotPassword({ status }) {
    const { t } = useTranslation();

    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title={t('Forgot Password')} />

            <div className='mb-4 text-sm text-gray-600 dark:text-gray-400'>
                {t(
                    'Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.',
                )}
            </div>

            {status && (
                <div className='mb-4 text-sm font-medium text-green-600 dark:text-green-400'>
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    id='email'
                    type='email'
                    name='email'
                    value={data.email}
                    className='mt-1 block w-full'
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className='mt-2' />

                <div className='mt-4 flex items-center justify-end'>
                    <Button className='ml-4' disabled={processing}>
                        {t('Email Password Reset Link')}
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
