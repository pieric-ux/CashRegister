import { useTranslation } from 'react-i18next';
import DangerButton from '../../../../Components/DangerButton';

export default function Cart({ isCartVisible, cart, removeFromCart }) {
    const { t } = useTranslation();

    return (
        <div
            className={`${
                isCartVisible ? 'block' : 'hidden sm:block'
            } overflow-x-hidden rounded-lg border border-gray-300 sm:max-h-[229px] dark:border-gray-700`}
        >
            <table className='min-w-full divide-y divide-gray-300 text-gray-900 transition duration-300 ease-linear dark:divide-gray-700 dark:text-gray-100'>
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
                            <td className='p-1 pr-2 text-right text-sm'>{`${item.client_price} ${t(
                                'currency_symbol',
                            )}`}</td>
                            <td className='hidden p-1 pr-2 text-right text-sm sm:table-cell'>{`${
                                item.quantity * item.client_price
                            } ${t('currency_symbol')}`}</td>
                            <td className='p-1 text-center'>
                                <DangerButton
                                    className='!px-2'
                                    onClick={() => removeFromCart(index)}
                                >
                                    <svg
                                        className='h-3 w-3 text-white'
                                        fill='currentColor'
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 430.901 583.409'
                                    >
                                        <g>
                                            <path
                                                d='M3.339,199.409h384v320c0,35.3-28.7,64-64,64h-256c-35.3,0-64-28.7-64-64V199.409z M99.339,263.409c-8.8,0-16,7.2-16,16
		                                                    v224c0,8.8,7.2,16,16,16s16-7.2,16-16v-224C115.339,270.609,108.139,263.409,99.339,263.409z M195.339,263.409c-8.8,0-16,7.2-16,16
                                                            v224c0,8.8,7.2,16,16,16s16-7.2,16-16v-224C211.339,270.609,204.139,263.409,195.339,263.409z M291.339,263.409
                                                            c-8.8,0-16,7.2-16,16v224c0,8.8,7.2,16,16,16s16-7.2,16-16v-224C307.339,270.609,300.139,263.409,291.339,263.409z'
                                            />
                                            <path
                                                d='M148.166,27.847c8.802-8.396,21.559-10.989,32.929-6.851l113.139,41.179c11.37,4.138,19.475,14.325,20.821,26.414
                                                            l1.875,15.9l90.21,32.834c16.633,6.054,25.179,24.382,19.126,41.015c-6.054,16.633-24.382,25.179-41.015,19.126L24.41,66.129
                                                            C7.777,60.075-0.769,41.746,5.284,25.114S29.667-0.065,46.299,5.988l90.21,32.834L148.166,27.847z'
                                            />
                                        </g>
                                    </svg>
                                </DangerButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
