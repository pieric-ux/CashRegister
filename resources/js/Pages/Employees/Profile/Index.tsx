import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import EmployeeLayout from '@/Layouts/EmployeeLayout';
import UpdateEmployeeAvatar from '@/Pages/Employees/Profile/Partials/UpdateEmployeeAvatar';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card/card';

export default function Index({ employeeAuth, localization }) {
    const { t } = useTranslation();

    return (
        <EmployeeLayout auth={employeeAuth} localization={localization}>
            <Head title={t('Profile')} />
            <div className='mx-auto max-w-7xl space-y-6 px-2 sm:px-6 lg:px-8'>
                <UpdateEmployeeAvatar avatarPath={employeeAuth.avatarPath} />

                <section>
                    <Card>
                        <CardHeader size={'xl'}>
                            <CardTitle>{t('Profile Information')}</CardTitle>
                            <CardDescription>
                                {t(
                                    'Contact your administrator to update your profile information and e-mail address if they are incorrect.',
                                )}
                            </CardDescription>
                        </CardHeader>
                        <CardContent size={'xl'}>
                            <div className='space-y-6'>
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
                        </CardContent>
                    </Card>
                </section>
            </div>
        </EmployeeLayout>
    );
}
