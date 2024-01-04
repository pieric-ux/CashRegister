import { useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button';
import { Svg } from '@/Components/ui/svg/Svg';

export default function DeleteDishForm({ dish }) {
    const { t } = useTranslation();

    const [confirmingDishDeletion, setConfirmingDishDeletion] = useState(false);

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

    const confirmDishDeletion = () => {
        setConfirmingDishDeletion(true);
    };

    const deleteDish = (e) => {
        e.preventDefault();

        destroy(route('dishes.destroy', dish), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingDishDeletion(false);

        reset();
    };

    return (
        <section>
            <Button
                variant={'destructive'}
                size={'icon'}
                onClick={confirmDishDeletion}
                aria-label={t('Delete the dish')}
            >
                <Svg type={'delete'} variant={'destructive'} />
            </Button>

            <Modal show={confirmingDishDeletion} onClose={closeModal}>
                <form onSubmit={deleteDish} className='p-6'>
                    <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
                        {t('Are you sure you want to delete your dish?')}
                    </h2>

                    <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                        {t(
                            'Once your dish is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your dish.',
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
                            aria-label={t('Delete the dish')}
                        >
                            {t('Delete Dish')}
                        </Button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
