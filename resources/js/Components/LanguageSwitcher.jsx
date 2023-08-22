import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher({ localization }) {
    const { i18n } = useTranslation();

    const handleLanguageChange = (e) => {
        const language = e.target.value;
        axios.get(`/language-switch/${language}`)
            .then(() => {
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
                className="pr-8 py-1 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 dark:text-gray-300 focus:border-sky-500 dark:focus:border-sky-600 focus:ring-sky-500 dark:focus:ring-sky-600 rounded-md shadow-sm transition ease-linear duration-300"
            >
                {localization.locales.map((locale) =>
                    <option key={locale} value={locale}>{locale}</option>
                )}
            </select>
        </div>
    );
}