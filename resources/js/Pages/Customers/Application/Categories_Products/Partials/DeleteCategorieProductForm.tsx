import { useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button';
import { Svg } from '@/Components/ui/svg/Svg';

export default function DeleteCategorieProductForm({ category }) {
    const { t } = useTranslation();

    const [confirmingCategoryDeletion, setConfirmingCategoryDeletion] = useState(false);

    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmCategoryDeletion = () => {
        setConfirmingCategoryDeletion(true);
    };

    const deleteCategory = (e) => {
        e.preventDefault();

        destroy(route('categories.destroy', category), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingCategoryDeletion(false);

        reset();
    };

    return (
        <section>
            <Button
                variant={'destructive'}
                size={'icon'}
                onClick={confirmCategoryDeletion}
                aria-label={t('Delete the category of product')}
            >
                <Svg type={'delete'} variant={'destructive'} />
            </Button>

            <Modal show={confirmingCategoryDeletion} onClose={closeModal}>
                <form onSubmit={deleteCategory} className='p-6'>
                    <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
                        {t('Are you sure you want to delete your category of product?')}
                    </h2>

                    <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                        {t(
                            'Once your category of product is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your category of product.',
                        )}
                    </p>

                    <div className='mt-6'>
                        <InputLabel htmlFor='password' value={t('Password')} className='sr-only' />

                        <TextInput
                            id='password'
                            type='password'
                            name='password'
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className='mt-1 block w-3/4'
                            isFocused
                            placeholder={t('Password')}
                        />

                        <InputError message={errors.password} className='mt-2' />
                    </div>

                    <div className='mt-6 flex justify-end'>
                        <Button variant={'secondary'} onClick={closeModal}>
                            {t('Cancel')}
                        </Button>

                        <Button
                            variant={'destructive'}
                            className='ml-3'
                            disabled={processing}
                            aria-label={t('Delete the category of product')}
                        >
                            {t('Delete Category')}
                        </Button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
