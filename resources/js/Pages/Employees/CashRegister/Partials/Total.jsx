import { useTranslation } from "react-i18next";

export default function Total({ total }) {
    const { t } = useTranslation();

    return (
        <div className="self-end flex items-center justify-center mt-6 p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg transition ease-linear duration-300">
            <span className="font-medium sm:text-2xl text-xl mr-2">{t('Total')}:</span>
            <span className="font-bold sm:text-2xl text-xl">{total} {t('currency_symbol')}</span>
        </div>
    );
}