import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

export default function useColorMode() {
    const [colorMode, setColorMode] = useLocalStorage('theme', null);

    useEffect(() => {
        const className = 'dark';

        const bodyClass = window.document.body.classList;

        const handleColorSchemeChange = (event) => {
            const prefersDarkMode = event.matches;

            const newTheme = prefersDarkMode ? 'dark' : 'light';

            setColorMode(newTheme);

            bodyClass.toggle(className, prefersDarkMode);
        };

        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        darkModeMediaQuery.addEventListener('change', handleColorSchemeChange);

        if (colorMode === null) {
            const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

            const initialTheme = prefersDarkMode ? 'dark' : 'light';

            setColorMode(initialTheme);

            bodyClass.toggle(className, prefersDarkMode);
        } else {
            bodyClass.toggle(className, colorMode === 'dark');
        }

        return () => {
            darkModeMediaQuery.removeEventListener('change', handleColorSchemeChange);
        };
    }, [colorMode, setColorMode]);

    return [colorMode, setColorMode];
}
