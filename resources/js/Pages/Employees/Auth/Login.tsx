import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';

export default function Login({ status, application, code }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        passwordless: code ?? '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('employees.login', application.slug));
    };

    return (
        <GuestLayout>
            <Head title={t('Log in')} />

            {status && <div className='mb-4 text-sm font-medium text-green-600'>{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor='passwordless' value={t('Activation Code')} />

                    <TextInput
                        id='passwordless'
                        name='passwordless'
                        value={data.passwordless}
                        className='mt-1 block w-full'
                        isFocused={true}
                        onChange={(e) => setData('passwordless', e.target.value)}
                    />

                    <InputError message={errors.passwordless} className='mt-2' />
                </div>

                <div className='mt-4 block'>
                    <label className='flex items-center'>
                        <Checkbox
                            name='remember'
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className='ml-2 text-sm text-gray-600 dark:text-gray-400'>
                            {t('Remember me')}
                        </span>
                    </label>
                </div>

                <div className='mt-4 flex items-center justify-end'>
                    <Button className='ml-4' disabled={processing}>
                        {t('Log in')}
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
