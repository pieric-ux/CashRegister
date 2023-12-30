import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Register() {
    const { t } = useTranslation();

    {
        /* Initialize form data and handle form submission */
    }
    const { data, setData, post, processing, errors, reset } = useForm({
        company_name: '',
        first_name: '',
        last_name: '',
        address: '',
        city: '',
        npa: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    {
        /* Reset password and password confirmation fields when component unmounts */
    }
    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('customers.register'));
    };

    return (
        <GuestLayout>
            <Head title={t('Register')} />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor='company_name'>
                        {t('Company Name')} <small>({t('facultative')})</small>
                    </InputLabel>

                    <TextInput
                        id='company_name'
                        name='company_name'
                        value={data.company_name}
                        className='mt-1 block w-full'
                        autoComplete='organization'
                        isFocused={true}
                        onChange={(e) => setData('company_name', e.target.value)}
                    />

                    <InputError message={errors.company_name} className='mt-2' />
                </div>

                <div className='mt-4'>
                    <InputLabel htmlFor='first_name' value={t('First Name')} />

                    <TextInput
                        id='first_name'
                        name='first_name'
                        value={data.first_name}
                        className='mt-1 block w-full'
                        autoComplete='given-name'
                        onChange={(e) => setData('first_name', e.target.value)}
                    />

                    <InputError message={errors.first_name} className='mt-2' />
                </div>

                <div className='mt-4'>
                    <InputLabel htmlFor='last_name' value={t('Last Name')} />

                    <TextInput
                        id='last_name'
                        name='last_name'
                        value={data.last_name}
                        className='mt-1 block w-full'
                        autoComplete='family-name'
                        onChange={(e) => setData('last_name', e.target.value)}
                    />

                    <InputError message={errors.last_name} className='mt-2' />
                </div>

                <div className='mt-4'>
                    <InputLabel htmlFor='address' value={t('Address')} />

                    <TextInput
                        id='address'
                        name='address'
                        value={data.address}
                        className='mt-1 block w-full'
                        autoComplete='street-address'
                        onChange={(e) => setData('address', e.target.value)}
                    />

                    <InputError message={errors.address} className='mt-2' />
                </div>

                <div className='mt-4 flex gap-4'>
                    <div className='basis-3/5'>
                        <InputLabel htmlFor='city' value={t('City')} />

                        <TextInput
                            id='city'
                            name='city'
                            value={data.city}
                            className='mt-1 block w-full'
                            autoComplete='address-level2'
                            onChange={(e) => setData('city', e.target.value)}
                        />

                        <InputError message={errors.city} className='mt-2' />
                    </div>
                    <div className='basis-2/5'>
                        <InputLabel htmlFor='npa' value={t('NPA')} />

                        <TextInput
                            id='npa'
                            name='npa'
                            value={data.npa}
                            className='mt-1 block w-full'
                            autoComplete='postal-code'
                            onChange={(e) => setData('npa', e.target.value)}
                        />

                        <InputError message={errors.npa} className='mt-2' />
                    </div>
                </div>

                <div className='mt-4'>
                    <InputLabel htmlFor='email' value={t('Email')} />

                    <TextInput
                        id='email'
                        type='email'
                        name='email'
                        value={data.email}
                        className='mt-1 block w-full'
                        autoComplete='username'
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className='mt-2' />
                </div>

                <div className='mt-4'>
                    <InputLabel htmlFor='password' value={t('Password')} />

                    <TextInput
                        id='password'
                        type='password'
                        name='password'
                        value={data.password}
                        className='mt-1 block w-full'
                        autoComplete='new-password'
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className='mt-2' />
                </div>

                <div className='mt-4'>
                    <InputLabel htmlFor='password_confirmation' value={t('Confirm Password')} />

                    <TextInput
                        id='password_confirmation'
                        type='password'
                        name='password_confirmation'
                        value={data.password_confirmation}
                        className='mt-1 block w-full'
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />

                    <InputError message={errors.password_confirmation} className='mt-2' />
                </div>

                <div className='mt-4 flex items-center justify-end'>
                    <Link
                        href={route('customers.login')}
                        className='rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800'
                    >
                        {t('Already registered?')}
                    </Link>

                    <PrimaryButton className='ml-4' disabled={processing}>
                        {t('Register')}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
