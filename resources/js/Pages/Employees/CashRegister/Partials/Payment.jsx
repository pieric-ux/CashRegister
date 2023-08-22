import { useState } from "react";
import Modal from "../../../../Components/Modal";
import { useTranslation } from "react-i18next";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";

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
                className="w-full mt-4 inline-flex items-center justify-center px-4 py-2 bg-sky-500 dark:bg-sky-500 border border-transparent rounded-md font-semibold text-base text-white uppercase tracking-widest hover:bg-sky-700 dark:hover:bg-sky-400 focus:bg-sky-700 dark:focus:bg-sky-400 active:bg-sky-900 dark:active:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-sky-800 transition ease-in-out duration-150 disabled:opacity-25 disabled:cursor-not-allowed"
                onClick={handleCheckout}
                disabled={isCartEmpty}
            >
                {t('Pay')}
            </button>
            <Modal show={openingModal} onClose={closeModal}>
                <div className='flex flex-col gap-4 p-4 sm:p-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md rounded-lg transition ease-linear duration-300'>
                    <div className="flex gap-2 items-center justify-around">
                        {paymentMethods.map(paymentMethod => {
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
                                            <img className="mx-auto" src={paymentMethod.picture_url} alt={paymentMethod.name} width={50} height={50} />
                                            <p>{t(`${paymentMethod.name}`)}</p>
                                        </div>
                                    )
                                        : <p>{t(`${paymentMethod.name}`)}</p>
                                    }
                                </PrimaryButton>
                            )
                        })}
                    </div>
                    <div className="self-end mt-4">
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