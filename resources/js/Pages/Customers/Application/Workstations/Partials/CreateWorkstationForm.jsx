import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import { useTranslation } from 'react-i18next';

export default function CreateWorkstationForm({ application, className = '' }) {
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

        post(route('workstations.store', application.slug), {
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
                <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
                    {t('Create a Workstation')}
                </h2>

                <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                    {t(
                        "Don't have any workstations yet? Looking to add another one? Click the 'Create' button to begin.",
                    )}
                </p>
            </header>
            <PrimaryButton onClick={openModal} aria-label={t('Create a workstation')}>
                {t('Create')}
            </PrimaryButton>

            <Modal show={openingModal} onClose={closeModal}>
                <form onSubmit={submit} className='p-6'>
                    <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
                        {t('Create Workstation')}
                    </h2>

                    <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                        {t(
                            "Ready to create a new workstation? Fill out the form below with the required details and hit the 'Create' button to get started.",
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

                    <div className='mt-6 flex justify-end'>
                        <SecondaryButton onClick={closeModal}>{t('Cancel')}</SecondaryButton>
                        <PrimaryButton
                            className='ml-3'
                            disabled={processing}
                            aria-label={t('Create a Workstation')}
                        >
                            {t('Create')}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
