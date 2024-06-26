import axios from 'axios';
import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from 'react-country-flag';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import {
    Select,
    SelectContent,
    SelectIcon,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select/select';

export default function LanguageSwitcher(): JSX.Element {
    const { i18n } = useTranslation();

    const { localization } = usePage<InertiaPageProps>().props;

    const [language, setLanguage] = useState(i18n.language);

    const onSubmit = (value: string): void => {
        setLanguage(value);
        i18n.changeLanguage(value);
        axios.get(`/language-switch/${value}`);
        document.documentElement.lang = value;
    };

    return (
        <div>
            <Select value={language} onValueChange={onSubmit}>
                <SelectTrigger>
                    <SelectValue aria-label={language}>
                        <ReactCountryFlag countryCode={language.split('-')[1]} />
                    </SelectValue>
                    <SelectIcon asChild>
                        <ChevronDownIcon />
                    </SelectIcon>
                </SelectTrigger>
                <SelectContent position={'popper'}>
                    {localization.locales.map((locale) => (
                        <SelectItem key={locale} value={locale}>
                            <ReactCountryFlag countryCode={locale.split('-')[1]} />
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
