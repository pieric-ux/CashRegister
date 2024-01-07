import { Switch, SwitchThumb } from '../ui/switch/switch';
import useColorMode from '@/Hooks/useColorMode';
import { useTranslation } from 'react-i18next';
import { Svg } from '../ui/svg/Svg';

export default function ThemeSwitcher() {
    const { t } = useTranslation();

    const [colorMode, setColorMode] = useColorMode();

    const handleThemeChange = () => {
        const newTheme = colorMode === 'light' ? 'dark' : 'light';
        setColorMode(newTheme);
    };

    return (
        <Switch
            onClick={handleThemeChange}
            size={'theme'}
            aria-label={t('Toggle between light and dark themes')}
            asChild
        >
            <SwitchThumb size={'theme'}>
                {colorMode === 'light' ? (
                    <Svg type='light' size={'sm'} />
                ) : (
                    <Svg type='dark' size={'sm'} />
                )}
            </SwitchThumb>
        </Switch>
    );
}
