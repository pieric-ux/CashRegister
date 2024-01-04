import clsx from 'clsx';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button';
import { Svg } from '@/Components/ui/svg/Svg';

export default function UpdateAppForm({ application, className = '' }) {
    const { t } = useTranslation();

    const [openingModal, setOpeningModal] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    const { data, setData, patch, processing, errors } = useForm({
        name: application.name,
        description: '',
        start_date: '',
        end_date: '',
        location: '',
        website: '',
    });

    const openModal = () => {
        setOpeningModal(true);
    };

    const closeModal = () => {
        setOpeningModal(false);
        setData({
            name: application.name,
            description: application.description,
            start_date: application.start_date,
            end_date: application.end_date,
            location: application.location,
            website: application.website,
        });
        setShowErrors(false);
    };

    useEffect(() => {
        setData({
            name: application.name ?? '',
            description: application.description ?? '',
            start_date: application.start_date ?? '',
            end_date: application.end_date ?? '',
            location: application.location ?? '',
            website: application.website ?? '',
        });
    }, [application]);

    const submit = (e) => {
        e.preventDefault();

        patch(route('applications.update', application.slug), {
            preserveScroll: true,
            onError: () => {
                setShowErrors(true);
            },
            onSuccess: () => closeModal(),
        });
    };

    return (
        <section className={clsx('space-y-6', className)}>
            <Button size={'icon'} onClick={openModal} aria-label={t('Edit your app')}>
                <Svg type={'edit'} />
            </Button>

            <Modal show={openingModal} onClose={closeModal}>
                <form onSubmit={submit} className='p-6'>
                    <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
                        {t('Edit App')}
                    </h2>

                    <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                        {t(
                            "Ready to update the application? Fill out the form below with the required details and click the 'Save' button to apply the changes.",
                        )}
                    </p>

                    <div className='mt-6'>
                        <InputLabel htmlFor='name' value={t('Name')} />

                        <TextInput
                            id='name'
                            name='name'
                            className='mt-1 block w-3/4'
                            value={data.name ?? ''}
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                        />

                        <InputError className='mt-2' message={showErrors ? errors.name : null} />
                    </div>

                    <div className='mt-6'>
                        <InputLabel htmlFor='description' value={t('Description')} />

                        <textarea
                            id='description'
                            name='description'
                            className={clsx(
                                'mt-1 block w-3/4 rounded-md border-gray-300 shadow-sm transition duration-300 ease-linear',
                                'focus:border-sky-500 focus:ring-sky-500',

                                'dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300',
                                'dark:focus:border-sky-600 dark:focus:ring-sky-600',
                            )}
                            rows={5}
                            value={data.description ?? ''}
                            onChange={(e) => setData('description', e.target.value)}
                        />

                        <InputError
                            className='mt-2'
                            message={showErrors ? errors.description : null}
                        />
                    </div>

                    <div className='mt-6'>
                        <InputLabel htmlFor='start_date' value={t('Start Date')} />

                        <TextInput
                            id='start_date'
                            name='start_date'
                            type='date'
                            className='mt-1 w-3/4'
                            value={data.start_date ?? ''}
                            onChange={(e) => setData('start_date', e.target.value)}
                        />

                        <InputError
                            className='mt-2'
                            message={showErrors ? errors.start_date : null}
                        />
                    </div>

                    <div className='mt-6'>
                        <InputLabel htmlFor='end_date' value={t('End Date')} />

                        <TextInput
                            id='end_date'
                            name='end_date'
                            type='date'
                            className='mt-1 w-3/4'
                            value={data.end_date ?? ''}
                            onChange={(e) => setData('end_date', e.target.value)}
                        />

                        <InputError
                            className='mt-2'
                            message={showErrors ? errors.end_date : null}
                        />
                    </div>

                    <div className='mt-6'>
                        <InputLabel htmlFor='location' value={t('Location')} />

                        <TextInput
                            id='location'
                            name='location'
                            className='mt-1 block w-3/4'
                            value={data.location ?? ''}
                            onChange={(e) => setData('location', e.target.value)}
                        />

                        <InputError
                            className='mt-2'
                            message={showErrors ? errors.location : null}
                        />
                    </div>

                    <div className='mt-6'>
                        <InputLabel htmlFor='website' value={t('Website')} />

                        <TextInput
                            id='website'
                            name='website'
                            placeholder='https://'
                            pattern='https://.*'
                            className='mt-1 block w-3/4'
                            value={data.website ?? ''}
                            onChange={(e) => setData('website', e.target.value)}
                        />

                        <InputError className='mt-2' message={showErrors ? errors.website : null} />
                    </div>

                    <div className='mt-6 flex justify-end'>
                        <Button variant={'secondary'} onClick={closeModal}>
                            {t('Cancel')}
                        </Button>

                        <Button
                            className='ml-3'
                            disabled={processing}
                            aria-label={t('Edit your app')}
                        >
                            {t('Save')}
                        </Button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
