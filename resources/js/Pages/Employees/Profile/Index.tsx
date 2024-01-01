import EmployeeLayout from '@/Layouts/EmployeeLayout';
import { Head } from '@inertiajs/react';
import UpdateEmployeeAvatar from './Partials/UpdateEmployeeAvatar';
import { useTranslation } from 'react-i18next';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Index({ employeeAuth, localization }) {
    const { t } = useTranslation();

    return (
        <EmployeeLayout auth={employeeAuth} localization={localization}>
            <Head title={t('Profile')} />
            <div className='mx-auto max-w-7xl space-y-6 px-2 sm:px-6 lg:px-8'>
                <div className='rounded-lg bg-white p-4 shadow-md transition duration-300 ease-linear sm:p-8 dark:bg-gray-800'>
                    <UpdateEmployeeAvatar
                        className='mx-auto max-w-xl'
                        avatarPath={employeeAuth.avatarPath}
                    />

                    <section className='mx-auto mt-6 max-w-xl'>
                        <header>
                            <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
                                {t('Profile Information')}
                            </h2>

                            <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                                {t(
                                    'Contact your administrator to update your profile information and e-mail address if they are incorrect.',
                                )}
                            </p>
                        </header>

                        <div className='mt-6 space-y-6'>
                            <div>
                                <InputLabel htmlFor='first_name' value={t('First Name')} />

                                <TextInput
                                    id='first_name'
                                    name='first_name'
                                    value={employeeAuth.employee.first_name ?? ''}
                                    className='mt-1 block w-full disabled:cursor-not-allowed'
                                    disabled
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor='last_name' value={t('Last Name')} />

                                <TextInput
                                    id='last_name'
                                    name='last_name'
                                    value={employeeAuth.employee.last_name ?? ''}
                                    className='mt-1 block w-full disabled:cursor-not-allowed'
                                    disabled
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor='phone' value={t('Phone')} />

                                <TextInput
                                    id='phone'
                                    name='phone'
                                    type='tel'
                                    value={employeeAuth.employee.phone ?? ''}
                                    className='mt-1 block w-full disabled:cursor-not-allowed'
                                    disabled
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor='email' value={t('Email')} />

                                <TextInput
                                    id='email'
                                    name='email'
                                    type='email'
                                    value={employeeAuth.employee.email ?? ''}
                                    className='mt-1 block w-full disabled:cursor-not-allowed'
                                    disabled
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </EmployeeLayout>
    );
}
