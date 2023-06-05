import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useColorMode = () => {
    {/* Initialise l'état du mode couleur en utilisant le hook useLocalStorage, qui récupère la valeur stockée depuis le localStorage. */ }
    const [colorMode, setColorMode] = useLocalStorage('theme', null);

    useEffect(() => {
        {/* Nom de la classe CSS pour le mode sombre */ }
        const className = 'dark';
        {/* Référence à la liste de classes du document.body */ }
        const bodyClass = window.document.body.classList;

        {/* Fonction de gestion du changement de mode de couleur */ }
        const handleColorSchemeChange = event => {
            {/* Vérifie si le mode sombre est préféré */ }
            const prefersDarkMode = event.matches;
            {/* Détermine le nouveau thème en fonction de la préférence */ }
            const newTheme = prefersDarkMode ? 'dark' : 'light';
            {/* Met à jour l'état du mode couleur avec le nouveau thème */ }
            setColorMode(newTheme);
            {/* Ajoute ou supprime la classe 'dark' sur l'élément body en fonction du mode préféré */ }
            bodyClass.toggle(className, prefersDarkMode);
        };

        {/* Création d'une media query pour détecter le mode de couleur préféré du système */ }
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        {/* Ajout d'un écouteur d'événement pour gérer les changements de mode de couleur */ }
        darkModeMediaQuery.addEventListener('change', handleColorSchemeChange);

        if (colorMode === null) {
            {/* Vérifie si le mode de couleur n'est pas défini par l'utilisateur */ }
            const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            {/* Détermine le thème initial en fonction du mode préféré */ }
            const initialTheme = prefersDarkMode ? 'dark' : 'light';
            {/* Met à jour l'état du mode couleur avec le thème initial */ }
            setColorMode(initialTheme);
            {/* Ajoute ou supprime la classe 'dark' sur l'élément body en fonction du mode préféré */ }
            bodyClass.toggle(className, prefersDarkMode);
        } else {
            {/* Le mode de couleur est défini par l'utilisateur, ajoute ou supprime la classe 'dark' en fonction de la valeur */ }
            bodyClass.toggle(className, colorMode === 'dark');
        }

        {/* Retire l'écouteur d'événement lorsque le composant est démonté ou que la dépendance change */ }
        return () => {
            darkModeMediaQuery.removeEventListener('change', handleColorSchemeChange);
        };
    }, [colorMode, setColorMode]);
    {/* Retourne l'état du mode couleur et la fonction de mise à jour du mode couleur */ }
    return [colorMode, setColorMode];
};

export default useColorMode;