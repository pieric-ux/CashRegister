import { Head, Link } from '@inertiajs/react';
import CustomerLayout from '@/Layouts/CustomerLayout';
import CreateAppForm from './Partials/CreateAppForm';
import UpdateAppForm from './Partials/UpdateAppForm';
import DeleteAppForm from './Partials/DeleteAppForm';
import UpdateAppPoster from './Partials/UpdateAppPoster';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button';
import { Svg } from '@/Components/ui/svg/Svg';

export default function Index({ customerAuth, applications, localization }) {
    const { t } = useTranslation();

    return (
        <CustomerLayout auth={customerAuth} localization={localization}>
            <Head title={t('Applications')} />

            {/* Main container */}
            <div className='mx-auto max-w-7xl space-y-6 px-2 sm:px-6 lg:px-8'>
                {/* Create Application Form */}
                <div className='rounded-lg bg-white p-4 shadow-md transition duration-300 ease-linear sm:p-8 dark:bg-gray-800'>
                    <CreateAppForm className='mx-auto max-w-xl' />
                </div>

                {/* Display applications or no application message */}
                {applications.length > 0 ? (
                    <ul>
                        {applications.map((application) => (
                            <li className='my-4' key={application.id}>
                                {/* Application Card */}
                                <div className='relative flex flex-col rounded-lg bg-white p-4 text-gray-900 shadow-md transition duration-300 ease-linear sm:p-8 md:flex-row md:gap-10 lg:gap-12 dark:bg-gray-800 dark:text-gray-100'>
                                    <div className='absolute right-4 top-4 flex gap-2'>
                                        {/* Configure Button */}
                                        <Link
                                            href={route('applications.show', application.slug)}
                                            tabIndex='-1'
                                        >
                                            <Button
                                                size={'icon'}
                                                aria-label={t('Configure your app')}
                                            >
                                                <Svg type={'configure'} />
                                            </Button>
                                        </Link>
                                        {/* Update and Delete Buttons */}
                                        <UpdateAppForm application={application} />
                                        <DeleteAppForm application={application} />
                                    </div>
                                    {/* App Poster */}
                                    <div className='mt-8 flex items-center justify-center md:mt-0'>
                                        <UpdateAppPoster application={application} />
                                    </div>
                                    {/* App Information */}
                                    <div className='flex flex-1 flex-col gap-2'>
                                        <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
                                            {application.name}
                                        </h2>
                                        <div>
                                            <span className='text-sm text-gray-600 dark:text-gray-400'>{`${t(
                                                'Description',
                                            )} :`}</span>
                                            <p className='overflow-hidden text-clip text-gray-900 dark:text-gray-100'>
                                                {application.description}
                                            </p>
                                        </div>
                                        <div className='flex flex-wrap justify-around gap-12 sm:self-start'>
                                            <div>
                                                <span className='text-sm text-gray-600 dark:text-gray-400'>{`${t(
                                                    'Start Date',
                                                )} :`}</span>
                                                <p className='text-gray-900 dark:text-gray-100'>
                                                    {application.start_date}
                                                </p>
                                            </div>
                                            <div>
                                                <span className='text-sm text-gray-600 dark:text-gray-400'>{`${t(
                                                    'End Date',
                                                )} :`}</span>
                                                <p className='text-gray-900 dark:text-gray-100'>
                                                    {application.end_date}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-sm text-gray-600 dark:text-gray-400'>{`${t(
                                                'Location',
                                            )} :`}</span>
                                            <p className='text-gray-900 dark:text-gray-100'>
                                                {application.location}
                                            </p>
                                        </div>
                                        <div>
                                            <span className='text-sm text-gray-600 dark:text-gray-400'>{`${t(
                                                'Website',
                                            )} :`}</span>
                                            <p className='text-gray-900 dark:text-gray-100'>
                                                {application.website}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className='bg-white p-4 text-center shadow transition duration-300 ease-linear sm:rounded-lg sm:p-8 dark:bg-gray-800'>
                        <p className='text-gray-900 dark:text-gray-100'>
                            {t('No application found.')}
                        </p>
                    </div>
                )}
            </div>
        </CustomerLayout>
    );
}
