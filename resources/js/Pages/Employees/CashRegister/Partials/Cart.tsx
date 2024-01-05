import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button';
import { Svg } from '@/Components/ui/svg/Svg';
import { Card, CardHeader } from '@/Components/ui/card/card';

export default function Cart({ isCartVisible, cart, removeFromCart }) {
    const { t } = useTranslation();

    return (
        <Card
            className={clsx('overflow-x-hidden sm:max-h-[229px]', {
                block: isCartVisible,
                'hidden sm:block': !isCartVisible,
            })}
        >
            <CardHeader variant={'cart'}>
                <table
                    className={clsx(
                        'min-w-full divide-y divide-gray-300 text-gray-900 transition duration-300 ease-linear',
                        'dark:divide-gray-700 dark:text-gray-100',
                    )}
                >
                    <thead>
                        <tr className='sticky top-0 divide-x divide-gray-300 bg-white dark:divide-gray-700 dark:bg-gray-900'>
                            <th className='w-1/12 p-2 text-center text-xs font-medium uppercase tracking-wider'>
                                {t('QTY')}
                            </th>
                            <th className='py-2 text-center text-xs font-medium uppercase tracking-wider'>
                                {t('Product')}
                            </th>
                            <th className='w-3/12 py-2 pr-2 text-right text-xs font-medium uppercase tracking-wider'>
                                {t('Price')}
                            </th>
                            <th className='hidden w-3/12 py-2 pr-2 text-right text-xs font-medium uppercase tracking-wider sm:table-cell'>
                                {t('Sub-Total')}
                            </th>
                            <th className='w-1/12 text-center text-xs font-medium uppercase tracking-wider'>
                                #
                            </th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-300 dark:divide-gray-700'>
                        {cart.map((item, index) => (
                            <tr
                                key={index}
                                className='divide-x divide-gray-300 odd:bg-gray-400/25 even:bg-gray-200/25 dark:divide-gray-700 odd:dark:bg-gray-600 even:dark:bg-gray-800/25'
                            >
                                <td className='p-1 text-center text-sm'>{item.quantity}</td>
                                <td className='p-1 pl-2 text-left text-sm'>
                                    {item.name} {item.unit}
                                </td>
                                <td className='p-1 pr-2 text-right text-sm'>{`${
                                    item.client_price
                                } ${t('currency_symbol')}`}</td>
                                <td className='hidden p-1 pr-2 text-right text-sm sm:table-cell'>{`${
                                    item.quantity * item.client_price
                                } ${t('currency_symbol')}`}</td>
                                <td className='p-1 text-center'>
                                    <Button
                                        variant={'destructive'}
                                        size={'sm_icon'}
                                        onClick={() => removeFromCart(index)}
                                    >
                                        <Svg type={'delete'} variant={'destructive'} size={'sm'} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardHeader>
        </Card>
    );
}
