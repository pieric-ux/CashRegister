import { useState } from 'react';
import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from '@/Components/ui/dialog/dialog';

export default function ShowDetailsTransactionForm({ transaction, className = '' }) {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    const closeDialog = () => {
        setOpen(false);
    };

    return (
        <section className={className}>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button size={'icon'} aria-label={t('Show details')}>
                        <Svg type={'view'} />
                    </Button>
                </DialogTrigger>
                <DialogContent size={'2xl'}>
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
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    variant={'secondary'}
                                    onClick={closeDialog}
                                    className='self-end'
                                >
                                    {t('Cancel')}
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
}
