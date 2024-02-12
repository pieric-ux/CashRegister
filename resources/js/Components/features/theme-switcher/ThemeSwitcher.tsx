import { useDarkMode } from 'usehooks-ts';
import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import { Switch, SwitchThumb } from '@/Components/ui/switch/switch';

// FIXME:
export default function ThemeSwitcher(): JSX.Element {
    const { t } = useTranslation();
    const { isDarkMode, toggle } = useDarkMode();

    isDarkMode
        ? document.documentElement.classList.add('dark')
        : document.documentElement.classList.remove('dark');

    return (
        <Switch
            onClick={toggle}
            checked={isDarkMode}
            size={'theme'}
            aria-label={t('Toggle between light and dark themes')}
            asChild
        >
            <SwitchThumb size={'theme'}>
                {isDarkMode ? <Svg type='dark' size={'sm'} /> : <Svg type='light' size={'sm'} />}
            </SwitchThumb>
        </Switch>
    );
}
