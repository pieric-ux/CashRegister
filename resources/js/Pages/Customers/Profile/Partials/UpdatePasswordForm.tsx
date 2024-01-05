import { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card/card';

export default function UpdatePasswordForm({ className = '' }) {
    const { t } = useTranslation();
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <Card>
                <CardHeader size={'xl'}>
                    <CardTitle>{t('Update Password')}</CardTitle>
                    <CardDescription>
                        {t('Ensure your account is using a long, random password to stay secure.')}
                    </CardDescription>
                </CardHeader>
                <CardContent size={'xl'}>
                    <form onSubmit={updatePassword} className='space-y-6'>
                        <div>
                            <InputLabel htmlFor='current_password' value={t('Current Password')} />

                            <TextInput
                                id='current_password'
                                name='current_password'
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) => setData('current_password', e.target.value)}
                                type='password'
                                className='mt-1 block w-full'
                                autoComplete='current-password'
                            />

                            <InputError message={errors.current_password} className='mt-2' />
                        </div>

                        <div>
                            <InputLabel htmlFor='password' value={t('New Password')} />

                            <TextInput
                                id='password'
                                name='password'
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                type='password'
                                className='mt-1 block w-full'
                                autoComplete='new-password'
                            />

                            <InputError message={errors.password} className='mt-2' />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor='password_confirmation'
                                value={t('Confirm Password')}
                            />

                            <TextInput
                                id='password_confirmation'
                                name='password_confirmation'
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                type='password'
                                className='mt-1 block w-full'
                                autoComplete='new-password'
                            />

                            <InputError message={errors.password_confirmation} className='mt-2' />
                        </div>

                        <div className='flex items-center gap-4'>
                            <Button
                                disabled={processing}
                                aria-label={t('Save your updated password')}
                            >
                                {t('Save')}
                            </Button>

                            <Transition
                                show={recentlySuccessful}
                                enterFrom='opacity-0'
                                leaveTo='opacity-0'
                                className='transition ease-in-out'
                            >
                                <p className='text-sm text-gray-600 dark:text-gray-400'>
                                    {t('Saved.')}
                                </p>
                            </Transition>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
}
