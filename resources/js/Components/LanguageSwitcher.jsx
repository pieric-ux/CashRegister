export default function LanguageSwitcher({ GlobalTranslations }) {

    const handleLanguageChange = (e) => {
        const language = e.target.value;
        axios.get(`/language-switch/${language}`)
            .then((response) => {
                window.location.reload();
            })
            .catch((error) => { });
    };

    return (
        <div>
            <select
                onChange={handleLanguageChange}
                value={GlobalTranslations.locale}
                className="pr-8 py-1 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 dark:text-gray-300 focus:border-sky-500 dark:focus:border-sky-600 focus:ring-sky-500 dark:focus:ring-sky-600 rounded-md shadow-sm transition ease-linear duration-300"
            >
                {GlobalTranslations.locales.map((locale) =>
                    <option key={locale} value={locale}>{locale}</option>
                )}
            </select>
        </div>
    );
}