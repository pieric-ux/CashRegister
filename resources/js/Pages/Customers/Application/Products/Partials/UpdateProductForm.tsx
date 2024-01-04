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

export default function UpdateProductForm({ product, categories, dishes, className = '' }) {
    const { t } = useTranslation();

    const [openingModal, setOpeningModal] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    const { data, setData, patch, processing, errors } = useForm({
        name: product.name,
        unit: product.unit,
        client_price: product.client_price,
        cost_price: product.cost_price,
        category: product.fk_categories_products_id,
        dish: product.fk_dishes_id,
    });

    const openModal = () => {
        setOpeningModal(true);
    };

    const closeModal = () => {
        setOpeningModal(false);
        setData({
            name: product.name,
            unit: product.unit,
            client_price: product.client_price,
            cost_price: product.cost_price,
            category: product.fk_categories_products_id,
            dish: product.fk_dishes_id,
        });
        setShowErrors(false);
    };

    useEffect(() => {
        setData({
            name: product.name,
            unit: product.unit,
            client_price: product.client_price,
            cost_price: product.cost_price,
            category: product.fk_categories_products_id,
            dish: product.fk_dishes_id,
        });
    }, [product]);

    const submit = (e) => {
        e.preventDefault();

        patch(route('products.update', product), {
            preserveScroll: true,
            onError: () => {
                setShowErrors(true);
            },
            onSuccess: () => closeModal(),
        });
    };

    const selectClasses = clsx(
        'mt-1 block w-3/4 rounded-md border-gray-300 shadow-sm transition duration-300 ease-linear',
        'focus:border-sky-500 focus:ring-sky-500',

        'dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300',
        'dark:focus:border-sky-600 dark:focus:ring-sky-600',
    );

    return (
        <section className={`space-y-6 ${className}`}>
            <Button size={'icon'} onClick={openModal} aria-label={t('Edit the product')}>
                <Svg type={'edit'} />
            </Button>

            <Modal show={openingModal} onClose={closeModal}>
                <form onSubmit={submit} className='p-6'>
                    <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
                        {t('Edit Product')}
                    </h2>

                    <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                        {t(
                            "Ready to update the product? Fill out the form below with the required details and click the 'Save' button to apply the changes.",
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

                    <div className='mt-6'>
                        <InputLabel htmlFor='category' value={t('Category')} />

                        <select
                            id='category'
                            name='category'
                            className={selectClasses}
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name === 'No category'
                                        ? t('No category')
                                        : category.name}
                                </option>
                            ))}
                        </select>

                        <InputError
                            className='mt-2'
                            message={showErrors ? errors.category : null}
                        />
                    </div>

                    <div className='mt-6'>
                        <InputLabel htmlFor='dish' value={t('Dish')} />

                        <select
                            id='dish'
                            name='dish'
                            className={selectClasses}
                            value={data.dish}
                            onChange={(e) => setData('dish', e.target.value)}
                        >
                            {dishes.map((dish) => (
                                <option key={dish.id} value={dish.id}>
                                    {dish.name === 'No dish'
                                        ? t('No dish')
                                        : `${dish.name} ${dish.unit}`}
                                </option>
                            ))}
                        </select>

                        <InputError className='mt-2' message={showErrors ? errors.dish : null} />
                    </div>

                    <div className='mt-6 flex justify-end'>
                        <Button variant={'secondary'} onClick={closeModal}>
                            {t('Cancel')}
                        </Button>

                        <Button
                            className='ml-3'
                            disabled={processing}
                            aria-label={t('Edit the product')}
                        >
                            {t('Save')}
                        </Button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
