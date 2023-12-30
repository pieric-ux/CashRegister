import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import { useTranslation } from 'react-i18next';

export default function UpdateCategorieProductForm({ category, className = '' }) {
    const { t } = useTranslation();

    {
        /* State for controlling modal visibility and form errors display */
    }
    const [openingModal, setOpeningModal] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    {
        /* Initialize form data and handle form submission */
    }
    const { data, setData, patch, processing, errors } = useForm({
        name: category.name,
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
        setData({
            name: category.name,
        });
        setShowErrors(false);
    };

    {
        /* Set form data when category prop changes */
    }
    useEffect(() => {
        setData({
            name: category.name,
        });
    }, [category]);

    const submit = (e) => {
        e.preventDefault();

        patch(route('categories.update', category), {
            preserveScroll: true,
            onError: () => {
                setShowErrors(true);
            },
            onSuccess: () => closeModal(),
        });
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <PrimaryButton
                onClick={openModal}
                className='!px-2'
                aria-label={t('Edit the category of product')}
            >
                <svg
                    className='h-5 w-5 text-white dark:text-gray-800'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'
                >
                    <path d='M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z' />
                </svg>
            </PrimaryButton>

            <Modal show={openingModal} onClose={closeModal}>
                <form onSubmit={submit} className='p-6'>
                    <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
                        {t('Edit Category of product')}
                    </h2>

                    <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                        {t(
                            "Ready to update the category of product? Fill out the form below with the required details and click the 'Save' button to apply the changes.",
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
                            aria-label={t('Edit the category of product')}
                        >
                            {t('Save')}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
