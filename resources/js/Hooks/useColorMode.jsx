import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useColorMode = () => {
    const [colorMode, setColorMode] = useLocalStorage('color-theme', null);

    useEffect(() => {
        const className = 'dark';
        const bodyClass = window.document.body.classList;

        if (colorMode === null) {
            // Vérifier si le système d'exploitation préfère le mode sombre
            const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

            if (prefersDarkMode) {
                bodyClass.add(className);
                setColorMode('dark');
            } else {
                bodyClass.remove(className);
                setColorMode('light');
            }
        } else {
            // Si le thème est défini par l'utilisateur, utilisez cette valeur
            if (colorMode === 'dark') {
                bodyClass.add(className);
            } else {
                bodyClass.remove(className);
            }
        }
    }, [colorMode, setColorMode]);

    return [colorMode, setColorMode];
};

export default useColorMode;
