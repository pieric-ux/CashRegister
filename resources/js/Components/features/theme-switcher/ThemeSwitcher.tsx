import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import useColorMode from '@/Hooks/useColorMode';
import { Switch, SwitchThumb } from '@/Components/ui/switch/switch';

const ThemeSwitcher = (): JSX.Element => {
    const { t } = useTranslation();

    const [colorMode, setColorMode] = useColorMode();
    console.log(colorMode);

    const handleThemeChange = (): void => {
        const newTheme = colorMode === 'light' ? 'dark' : 'light';
        setColorMode(newTheme);
    };

    return (
        <Switch
            onClick={handleThemeChange}
            checked={colorMode === 'dark'}
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
};

export default ThemeSwitcher;
