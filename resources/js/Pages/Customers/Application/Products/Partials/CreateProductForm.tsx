import clsx from 'clsx';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button';

export default function CreateProductForm({ application, className = '' }) {
    const { t } = useTranslation();

    const [openingModal, setOpeningModal] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        unit: '',
        client_price: '',
        cost_price: '',
    });

    const openModal = () => {
        setOpeningModal(true);
    };

    const closeModal = () => {
        setOpeningModal(false);
        reset();
        setShowErrors(false);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('products.store', application.slug), {
            preserveScroll: true,
            onError: () => {
                setShowErrors(true);
            },
            onSuccess: () => closeModal(),
        });
    };
    return (
        <section className={clsx('space-y-6', className)}>
            <header>
                <h1 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
                    {t('Create a Product')}
                </h1>

                <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                    {t(
                        "Don't have any product yet? Looking to add another one? Click the 'Create' button to begin.",
                    )}
                </p>
            </header>

            <Button onClick={openModal} aria-label={t('Create your product')}>
                {t('Create')}
            </Button>

            <Modal show={openingModal} onClose={closeModal}>
                <form onSubmit={submit} className='p-6'>
                    <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
                        {t('Create Product')}
                    </h2>

                    <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                        {t(
                            "Ready to create a new product? Fill out the form below with the required details and hit the 'Create' button to get started.",
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
                        <InputLabel htmlFor='unit' value={t('Unit')} />

                        <TextInput
                            id='unit'
                            name='unit'
                            className='mt-1 block w-3/4'
                            value={data.unit}
                            onChange={(e) => setData('unit', e.target.value)}
                        />

                        <InputError className='mt-2' message={showErrors ? errors.unit : null} />
                    </div>

                    <div className='mt-6'>
                        <InputLabel htmlFor='client_price' value={t('Client Price')} />

                        <TextInput
                            id='client_price'
                            name='client_price'
                            className='mt-1 block w-3/4'
                            value={data.client_price}
                            onChange={(e) => setData('client_price', e.target.value)}
                        />

                        <InputError
                            className='mt-2'
                            message={showErrors ? errors.client_price : null}
                        />
                    </div>

                    <div className='mt-6'>
                        <InputLabel htmlFor='cost_price' value={t('Cost Price')} />

                        <TextInput
                            id='cost_price'
                            name='cost_price'
                            className='mt-1 block w-3/4'
                            value={data.cost_price}
                            onChange={(e) => setData('cost_price', e.target.value)}
                        />

                        <InputError
                            className='mt-2'
                            message={showErrors ? errors.cost_price : null}
                        />
                    </div>

                    <div className='mt-6 flex justify-end'>
                        <Button variant={'secondary'} onClick={closeModal}>
                            {t('Cancel')}
                        </Button>
                        <Button
                            className='ml-3'
                            disabled={processing}
                            aria-label={t('Create your product')}
                        >
                            {t('Create')}
                        </Button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
