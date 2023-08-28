import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function DeleteUserForm({ className = '' }) {
    const { t } = useTranslation();

    {/* State to manage the modal visibility and user confirmation */ }
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);

    {/* Ref for the password input field */ }
    const passwordInput = useRef();

    {/* Initialize form data and handle form submission */ }
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

    {/* Open the confirmation modal */ }
    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    {/* Delete the user */ }
    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    {/* Close the modal and reset the form */ }
    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">{t('Delete Account')}</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {t('Once your account is deleted, all of its resources and data will be permanently deleted.')}
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion} aria-label={t('Delete your account')}>{t('Delete Account')}</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {t('Are you sure you want to delete your account?')}
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {t('Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.')}
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value={t('Password')} className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder={t('Password')}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>{t('Cancel')}</SecondaryButton>

                        <DangerButton className="ml-3" disabled={processing} aria-label={t('Delete your account')}>
                            {t('Delete Account')}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
