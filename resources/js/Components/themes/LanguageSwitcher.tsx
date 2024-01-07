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
} from './../ui/select/select';

export default function LanguageSwitcher({ localization }) {
    const { i18n } = useTranslation();

    const [language, setLanguage] = useState(i18n.language);

    useEffect(() => {
        axios.get(`/language-switch/${language}`).then(() => {
            i18n.changeLanguage(language);
            document.documentElement.lang = language;
        });
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
}
