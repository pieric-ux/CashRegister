import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import { useTranslation } from 'react-i18next';

export default function CreateAppForm({ className = '' }) {
    const { t } = useTranslation();

    {
        /* State for controlling modal visibility and form errors display */
    }
    const [openingModal, setOpeningModal] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    {
        /* Initialize form data and handle form submission */
    }
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        location: '',
        website: '',
    });

    {
        /* Open the modal */
    }
    const openModal = () => {
        setOpeningModal(true);
    };

    {
        /* Close the modal and reset form data */
    }
    const closeModal = () => {
        setOpeningModal(false);
        reset();
        setShowErrors(false);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('applications.store'), {
            preserveScroll: true,
            onError: () => {
                setShowErrors(true);
            },
            onSuccess: () => closeModal(),
        });
    };
    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h1 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
                    {t('Create an Application')}
                </h1>

                <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                    {t(
                        "Don't have any applications yet? Looking to add another one? Click the 'Create' button to begin.",
                    )}
                </p>
            </header>
            <PrimaryButton onClick={openModal} aria-label={t('Create your app')}>
                {t('Create')}
            </PrimaryButton>

            <Modal show={openingModal} onClose={closeModal}>
                <form onSubmit={submit} className='p-6'>
                    <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
                        {t('Create App')}
                    </h2>

                    <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                        {t(
                            "Ready to create a new application? Fill out the form below with the required details and hit the 'Create' button to get started.",
                        )}
                    </p>

                    <div className='mt-6'>
                        <InputLabel htmlFor='name' value={t('Name')} />

                        <TextInput
                            id='name'
                            name='name'
                            className='mt-1 block w-3/4'
                            value={data.name}
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
                            className='mt-1 block w-3/4 rounded-md border-gray-300 shadow-sm transition duration-300 ease-linear focus:border-sky-500 focus:ring-sky-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-sky-600 dark:focus:ring-sky-600'
                            rows={5}
                            value={data.description}
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
                            value={data.start_date}
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
                            value={data.end_date}
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
                            value={data.location}
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
                            value={data.website}
                            onChange={(e) => setData('website', e.target.value)}
                        />

                        <InputError className='mt-2' message={showErrors ? errors.website : null} />
                    </div>

                    <div className='mt-6 flex justify-end'>
                        <SecondaryButton onClick={closeModal}>{t('Cancel')}</SecondaryButton>
                        <PrimaryButton
                            className='ml-3'
                            disabled={processing}
                            aria-label={t('Create your app')}
                        >
                            {t('Create')}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
