import { type FC } from 'react';
import { Svg } from '@/Components/ui/svg/Svg';
import { useTranslation } from 'react-i18next';
import useColorMode from '@/Hooks/useColorMode';
import { Switch, SwitchThumb } from '@/Components/ui/switch/switch';

const ThemeSwitcher: FC = () => {
    const { t } = useTranslation();

    const [colorMode, setColorMode] = useColorMode(); // FIXME: state of switch isn't stable after new render

    const handleThemeChange = (): void => {
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
};

export default ThemeSwitcher;
