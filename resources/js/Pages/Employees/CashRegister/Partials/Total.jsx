import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export default function Total({ total }) {
    const { t } = useTranslation();

    return (
        <div
            className={clsx(
                'mt-6 flex items-center justify-center self-end rounded-lg bg-gray-100 p-4 text-gray-900 transition duration-300 ease-linear sm:p-6',
                'dark:bg-gray-900 dark:text-gray-100',
            )}
        >
            <span className='mr-2 text-xl font-medium sm:text-2xl'>{t('Total')}:</span>
            <span className='text-xl font-bold sm:text-2xl'>
                {total} {t('currency_symbol')}
            </span>
        </div>
    );
}
