import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function ConfirmPassword() {
    const { t } = useTranslation();

    {
        /* Initialize form data and handle form submission */
    }
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    {
        /* Reset password field when component unmounts */
    }
    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'));
    };

    return (
        <GuestLayout>
            <Head title={t('Confirm Password')} />

            <div className='mb-4 text-sm text-gray-600 dark:text-gray-400'>
                {t(
                    'This is a secure area of the application. Please confirm your password before continuing.',
                )}
            </div>

            <form onSubmit={submit}>
                <div className='mt-4'>
                    <InputLabel htmlFor='password' value={t('Password')} />

                    <TextInput
                        id='password'
                        type='password'
                        name='password'
                        value={data.password}
                        className='mt-1 block w-full'
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className='mt-2' />
                </div>

                <div className='mt-4 flex items-center justify-end'>
                    <PrimaryButton className='ml-4' disabled={processing}>
                        {t('Confirm')}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
