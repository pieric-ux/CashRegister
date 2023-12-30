import { Head, Link } from '@inertiajs/react';
import CustomerLayout from '@/Layouts/CustomerLayout';
import CreateAppForm from './Partials/CreateAppForm';
import UpdateAppForm from './Partials/UpdateAppForm';
import DeleteAppForm from './Partials/DeleteAppForm';
import UpdateAppPoster from './Partials/UpdateAppPoster';
import PrimaryButton from '@/Components/PrimaryButton';
import { useTranslation } from 'react-i18next';

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
                                            <PrimaryButton
                                                className='!px-2'
                                                aria-label={t('Configure your app')}
                                            >
                                                <svg
                                                    className='h-5 w-5 text-white dark:text-gray-800'
                                                    fill='currentColor'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    viewBox='0 0 512 512'
                                                >
                                                    <path d='M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z' />
                                                </svg>
                                            </PrimaryButton>
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
