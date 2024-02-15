import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import { useTernaryDarkMode } from 'usehooks-ts';
import { Switch, SwitchThumb } from '@/Components/ui/switch/switch';

export default function ThemeSwitcher(): JSX.Element {
    const { t } = useTranslation();
    const { isDarkMode, ternaryDarkMode, toggleTernaryDarkMode } = useTernaryDarkMode({
        localStorageKey: 'darkMode',
    });

    isDarkMode
        ? document.documentElement.classList.add('dark')
        : document.documentElement.classList.remove('dark');

    return (
        <Switch
            onClick={toggleTernaryDarkMode}
            checked={isDarkMode}
            size={'theme'}
            aria-label={t('Toggle between light and dark themes')}
            asChild
        >
            <SwitchThumb size={'theme'}>
                {ternaryDarkMode === 'dark' ? (
                    <Svg type='dark' size={'sm'} />
                ) : ternaryDarkMode === 'light' ? (
                    <Svg type='light' size={'sm'} />
                ) : (
                    <Svg type='system' size={'sm'} />
                )}
            </SwitchThumb>
        </Switch>
    );
}
