import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';
import { useTranslation } from 'react-i18next';
import Checkbox from '@/Components/Checkbox';
import clsx from 'clsx';
import { Button } from '@/Components/ui/button';
import { Svg } from '@/Components/ui/svg/Svg';

export default function UpdateDishForm({ dish, className = '' }) {
    const { t } = useTranslation();

    const [openingModal, setOpeningModal] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    const { data, setData, patch, processing, errors } = useForm({
        name: dish.name,
        unit: dish.unit,
        client_price: dish.client_price,
        cost_price: dish.cost_price,
        is_consigned: dish.is_consigned,
        is_SoldSeparately: dish.is_SoldSeparately,
    });

    useEffect(() => {
        if (!data.is_consigned) {
            setData('client_price', '');
        }
    }, [data.is_consigned]);

    const openModal = () => {
        setOpeningModal(true);
    };

    const closeModal = () => {
        setOpeningModal(false);
        setData({
            name: dish.name,
            unit: dish.unit,
            client_price: dish.client_price,
            cost_price: dish.cost_price,
            is_consigned: dish.is_consigned,
            is_SoldSeparately: dish.is_SoldSeparately,
        });
        setShowErrors(false);
    };

    useEffect(() => {
        setData({
            name: dish.name,
            unit: dish.unit,
            client_price: dish.client_price,
            cost_price: dish.cost_price,
            is_consigned: dish.is_consigned,
            is_SoldSeparately: dish.is_SoldSeparately,
        });
    }, [dish]);

    const submit = (e) => {
        e.preventDefault();

        patch(route('dishes.update', dish), {
            preserveScroll: true,
            onError: () => {
                setShowErrors(true);
            },
            onSuccess: () => closeModal(),
        });
    };

    return (
        <section className={clsx('space-y-6', className)}>
            <Button size={'icon'} onClick={openModal} aria-label={t('Edit the dish')}>
                <Svg type={'edit'} />
            </Button>

            <Modal show={openingModal} onClose={closeModal}>
                <form onSubmit={submit} className='p-6'>
                    <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
                        {t('Edit Dish')}
                    </h2>

                    <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                        {t(
                            "Ready to update the dish? Fill out the form below with the required details and click the 'Save' button to apply the changes.",
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
                            className='mt-1 block w-3/4 disabled:cursor-not-allowed'
                            value={data.client_price}
                            onChange={(e) => setData('client_price', e.target.value)}
                            disabled={!data.is_consigned}
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

                    <div className='mt-6'>
                        <label className='flex items-center'>
                            <Checkbox
                                name='is_consigned'
                                checked={data.is_consigned}
                                onChange={(e) => setData('is_consigned', e.target.checked)}
                            />
                            <span className='ml-2 text-sm text-gray-600 dark:text-gray-400'>
                                {t('Consigned')}
                            </span>
                        </label>
                        <InputError
                            className='mt-2'
                            message={showErrors ? errors.is_consigned : null}
                        />
                    </div>

                    <div className='mt-6'>
                        <label className='flex items-center'>
                            <Checkbox
                                name='is_SoldSeparately'
                                checked={data.is_SoldSeparately}
                                onChange={(e) => setData('is_SoldSeparately', e.target.checked)}
                            />
                            <span className='ml-2 text-sm text-gray-600 dark:text-gray-400'>
                                {t('Sold Separately')}
                            </span>
                        </label>
                        <InputError
                            className='mt-2'
                            message={showErrors ? errors.is_SoldSeparately : null}
                        />
                    </div>

                    <div className='mt-6 flex justify-end'>
                        <Button variant={'secondary'} onClick={closeModal}>
                            {t('Cancel')}
                        </Button>
                        <Button
                            className='ml-3'
                            disabled={processing}
                            aria-label={t('Edit the dish')}
                        >
                            {t('Save')}
                        </Button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
