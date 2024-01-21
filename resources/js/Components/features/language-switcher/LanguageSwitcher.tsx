import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import {
    Select,
    SelectContent,
    SelectIcon,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select/select';
import { usePage } from '@inertiajs/react';

const LanguageSwitcher = (): JSX.Element => {
    const { i18n } = useTranslation();

    const { localization } = usePage().props;

    const [language, setLanguage] = useState(i18n.language);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                await axios.get(`/language-switch/${language}`);
                await i18n.changeLanguage(language);
                document.documentElement.lang = language;
            } catch {}
        };

        void fetchData();
    }, [language]);

    return (
        <div>
            <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                    <SelectValue aria-label={language}>{language}</SelectValue>
                    <SelectIcon asChild>
                        <ChevronDownIcon />
                    </SelectIcon>
                </SelectTrigger>
                <SelectContent position={'popper'}>
                    {localization.locales.map((locale) => (
                        <SelectItem key={locale} value={locale}>
                            {locale}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default LanguageSwitcher;
