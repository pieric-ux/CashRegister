import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import { useTranslation } from 'react-i18next';
import SecondaryButton from '@/Components/SecondaryButton';

export default function ShowDetailsTransactionForm({ transaction, className = '' }) {
    const { t } = useTranslation();

    {
        /* State for controlling modal visibility */
    }
    const [openingModal, setOpeningModal] = useState(false);

    {
        /* Open the modal */
    }
    const openModal = () => {
        setOpeningModal(true);
    };

    {
        /* Close the modal */
    }
    const closeModal = () => {
        setOpeningModal(false);
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <PrimaryButton onClick={openModal} className='!px-2' aria-label={t('Show details')}>
                <svg
                    className='h-5 w-5 text-white dark:text-gray-800'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 576 512'
                >
                    <path d='M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z' />
                </svg>
            </PrimaryButton>

            <Modal show={openingModal} onClose={closeModal}>
                <div className='flex flex-col gap-4 p-4 sm:p-8'>
                    <div className='overflow-x-hidden rounded-lg border border-gray-300 dark:border-gray-700'>
                        <table className='min-w-full divide-y divide-gray-300 text-gray-900 transition duration-300 ease-linear dark:divide-gray-700 dark:text-gray-100'>
                            <thead>
                                <tr className='divide-x divide-gray-300 bg-white dark:divide-gray-700 dark:bg-gray-900'>
                                    <th className='w-1/12 p-2 text-center text-xs font-medium uppercase tracking-wider'>
                                        {t('QTY')}
                                    </th>
                                    <th className='py-2 text-center text-xs font-medium uppercase tracking-wider'>
                                        {t('Product')}
                                    </th>
                                    <th className='w-3/12 py-2 pr-2 text-right text-xs font-medium uppercase tracking-wider'>
                                        {t('Price')}
                                    </th>
                                    <th className='w-3/12 py-2 pr-2 text-right text-xs font-medium uppercase tracking-wider'>
                                        {t('Sub-Total')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-300 dark:divide-gray-700'>
                                {transaction.cr_details_transactions &&
                                    transaction.cr_details_transactions.map((detail, index) => (
                                        <tr
                                            key={index}
                                            className='divide-x divide-gray-300 odd:bg-gray-400/25 even:bg-gray-200/25 dark:divide-gray-700 odd:dark:bg-gray-600 even:dark:bg-gray-800/25'
                                        >
                                            <td className='p-1 text-center text-sm'>
                                                {detail.quantity}
                                            </td>
                                            <td className='p-1 pl-2 text-left text-sm'>
                                                {detail.item_name} {detail.unit}
                                            </td>
                                            <td className='p-1 pr-2 text-right text-sm'>
                                                {detail.client_price} {t('currency_symbol')}
                                            </td>
                                            <td className='p-1 pr-2 text-right text-sm'>
                                                {detail.quantity * detail.client_price}{' '}
                                                {t('currency_symbol')}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <SecondaryButton onClick={closeModal} className='self-end'>
                        {t('Cancel')}
                    </SecondaryButton>
                </div>
            </Modal>
        </section>
    );
}
