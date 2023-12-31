import clsx from 'clsx';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher({ localization }) {
    const { i18n } = useTranslation();

    const handleLanguageChange = (e) => {
        const language = e.target.value;
        axios.get(`/language-switch/${language}`).then(() => {
            i18n.changeLanguage(language);
            document.documentElement.lang = language;
        });
    };

    useEffect(() => {
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    return (
        <div>
            <select
                onChange={handleLanguageChange}
                value={i18n.language}
                className={clsx(
                    'rounded-md border border-gray-300 bg-gray-100 py-1 pr-8 shadow-sm transition duration-300 ease-linear',
                    'focus:border-sky-500 focus:ring-sky-500',

                    'dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300',
                    'dark:focus:border-sky-600 dark:focus:ring-sky-600',
                )}
            >
                {localization.locales.map((locale) => (
                    <option key={locale} value={locale}>
                        {locale}
                    </option>
                ))}
            </select>
        </div>
    );
}
