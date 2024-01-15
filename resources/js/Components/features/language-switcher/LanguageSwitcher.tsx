import axios from 'axios';
import { useEffect, useState, type FC } from 'react';
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

interface LaravelLocalization {
    locale: string;
    locales: string[];
}

interface LanguageSwitcherProps {
    localization: LaravelLocalization;
}

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ localization }) => {
    const { i18n } = useTranslation();

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
