import { useForm } from '@inertiajs/react';
import { useEffect, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Modal from "@/Components/Modal";
import { useTranslation } from 'react-i18next';
import Checkbox from '@/Components/Checkbox';

export default function UpdateDishForm({ dish, className = '' }) {
    const { t } = useTranslation();

    {/* State for controlling modal visibility and form errors display */ }
    const [openingModal, setOpeningModal] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    {/* Initialize form data and handle form submission */ }
    const { data, setData, patch, processing, errors } = useForm({
        name: dish.name,
        unit: dish.unit,
        client_price: dish.client_price,
        cost_price: dish.cost_price,
        is_consigned: dish.is_consigned,
        is_SoldSeparately: dish.is_SoldSeparately,
    });

    {/* Update client_price when is_consigned changes */ }
    useEffect(() => {
        if (!data.is_consigned) {
            setData('client_price', '');
        }
    }, [data.is_consigned]);

    {/* Open the modal */ }
    const openModal = () => {
        setOpeningModal(true);
    };

    {/* Close the modal and reset form data */ }
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

    {/* Set form data dish product prop changes */ }
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
            onError: () => { setShowErrors(true); },
            onSuccess: () => closeModal(),
        });
    }

    return (
        <section className={`space-y-6 ${className}`}>
            <PrimaryButton onClick={openModal} className='!px-2' aria-label={t('Edit the dish')}>
                <svg className="w-5 h-5 text-white dark:text-gray-800" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                </svg>
            </PrimaryButton>

            <Modal show={openingModal} onClose={closeModal}>

                <form onSubmit={submit} className='p-6'>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {t('Edit Dish')}
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {t('Ready to update the dish? Fill out the form below with the required details and click the \'Save\' button to apply the changes.')}
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="name" value={t('Name')} />

                        <TextInput
                            id="name"
                            name="name"
                            className="mt-1 block w-3/4"
                            value={data.name}
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                        />

                        <InputError className="mt-2" message={showErrors ? errors.name : null} />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="unit" value={t('Unit')} />

                        <TextInput
                            id="unit"
                            name="unit"
                            className="mt-1 block w-3/4"
                            value={data.unit}
                            onChange={(e) => setData('unit', e.target.value)}
                        />

                        <InputError className="mt-2" message={showErrors ? errors.unit : null} />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="client_price" value={t('Client Price')} />

                        <TextInput
                            id="client_price"
                            name="client_price"
                            className="mt-1 block w-3/4 disabled:cursor-not-allowed"
                            value={data.client_price}
                            onChange={(e) => setData('client_price', e.target.value)}
                            disabled={!data.is_consigned}
                        />

                        <InputError className="mt-2" message={showErrors ? errors.client_price : null} />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="cost_price" value={t('Cost Price')} />

                        <TextInput
                            id="cost_price"
                            name="cost_price"
                            className="mt-1 block w-3/4"
                            value={data.cost_price}
                            onChange={(e) => setData('cost_price', e.target.value)}
                        />

                        <InputError className="mt-2" message={showErrors ? errors.cost_price : null} />
                    </div>

                    <div className="mt-6">
                        <label className="flex items-center">
                            <Checkbox
                                name="is_consigned"
                                checked={data.is_consigned}
                                onChange={(e) => setData('is_consigned', e.target.checked)}
                            />
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{t('Consigned')}</span>
                        </label>
                        <InputError className="mt-2" message={showErrors ? errors.is_consigned : null} />
                    </div>

                    <div className="mt-6">
                        <label className="flex items-center">
                            <Checkbox
                                name="is_SoldSeparately"
                                checked={data.is_SoldSeparately}
                                onChange={(e) => setData('is_SoldSeparately', e.target.checked)}
                            />
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{t('Sold Separately')}</span>
                        </label>
                        <InputError className="mt-2" message={showErrors ? errors.is_SoldSeparately : null} />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            {t('Cancel')}
                        </SecondaryButton>
                        <PrimaryButton className='ml-3' disabled={processing} aria-label={t('Edit the dish')}>
                            {t('Save')}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}