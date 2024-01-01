import clsx from 'clsx';
import { useState } from 'react';
import Modal from '../../../../Components/Modal';
import { useTranslation } from 'react-i18next';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Payment({ paymentMethods, isCartEmpty, setSelectedPaymentMethod }) {
    const { t } = useTranslation();
    const [openingModal, setOpeningModal] = useState(false);

    const handleCheckout = () => {
        setOpeningModal(true);
    };

    const closeModal = () => {
        setOpeningModal(false);
    };

    return (
        <>
            <button
                className={clsx(
                    'mt-4 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-sky-500 px-4 py-2 text-base font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out',
                    'hover:bg-sky-700',
                    'focus:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2',
                    'active:bg-sky-900',
                    'disabled:cursor-not-allowed disabled:opacity-25',

                    'dark:bg-sky-500',
                    'dark:hover:bg-sky-400',
                    'dark:focus:bg-sky-400 dark:focus:ring-offset-sky-800',
                    'dark:active:bg-sky-300',
                )}
                onClick={handleCheckout}
                disabled={isCartEmpty}
            >
                {t('Pay')}
            </button>
            <Modal show={openingModal} onClose={closeModal}>
                <div
                    className={clsx(
                        'flex flex-col gap-4 rounded-lg bg-white p-4 text-gray-900 shadow-md transition duration-300 ease-linear sm:p-8',
                        'dark:bg-gray-800 dark:text-gray-100',
                    )}
                >
                    <div className='flex items-center justify-around gap-2'>
                        {paymentMethods.map((paymentMethod) => {
                            return (
                                <PrimaryButton
                                    key={paymentMethod.id}
                                    onClick={() => {
                                        setSelectedPaymentMethod(paymentMethod.id);
                                        closeModal();
                                    }}
                                >
                                    {paymentMethod.picture_url ? (
                                        <div>
                                            <img
                                                className='mx-auto'
                                                src={paymentMethod.picture_url}
                                                alt={paymentMethod.name}
                                                width={50}
                                                height={50}
                                            />
                                            <p>{t(`${paymentMethod.name}`)}</p>
                                        </div>
                                    ) : (
                                        <p>{t(`${paymentMethod.name}`)}</p>
                                    )}
                                </PrimaryButton>
                            );
                        })}
                    </div>
                    <div className='mt-4 self-end'>
                        <SecondaryButton
                            onClick={() => {
                                setSelectedPaymentMethod(null);
                                closeModal();
                            }}
                        >
                            {t('Cancel')}
                        </SecondaryButton>
                    </div>
                </div>
            </Modal>
        </>
    );
}
