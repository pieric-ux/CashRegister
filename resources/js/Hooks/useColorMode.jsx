import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

export default function useColorMode() {
    {
        /* Initialize the color mode state using the useLocalStorage hook, which retrieves the stored value from localStorage. */
    }
    const [colorMode, setColorMode] = useLocalStorage('theme', null);

    useEffect(() => {
        {
            /* CSS class name for dark mode */
        }
        const className = 'dark';
        {
            /* Reference to the list of classes of the document.body */
        }
        const bodyClass = window.document.body.classList;

        {
            /* Function to handle color mode change */
        }
        const handleColorSchemeChange = (event) => {
            {
                /* Check if dark mode is preferred */
            }
            const prefersDarkMode = event.matches;
            {
                /* Determine the new theme based on preference */
            }
            const newTheme = prefersDarkMode ? 'dark' : 'light';
            {
                /* Update the color mode state with the new theme */
            }
            setColorMode(newTheme);
            {
                /* Add or remove the 'dark' class on the body element based on the preferred mode */
            }
            bodyClass.toggle(className, prefersDarkMode);
        };

        {
            /* Create a media query to detect the system's preferred color mode */
        }
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        {
            /* Add an event listener to handle color mode changes */
        }
        darkModeMediaQuery.addEventListener('change', handleColorSchemeChange);

        if (colorMode === null) {
            {
                /* Check if color mode is not set by the user */
            }
            const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            {
                /* Determine the initial theme based on preference */
            }
            const initialTheme = prefersDarkMode ? 'dark' : 'light';
            {
                /* Update the color mode state with the initial theme */
            }
            setColorMode(initialTheme);
            {
                /* Add or remove the 'dark' class on the body element based on the preferred mode */
            }
            bodyClass.toggle(className, prefersDarkMode);
        } else {
            {
                /* Color mode is set by the user, add or remove the 'dark' class based on the value */
            }
            bodyClass.toggle(className, colorMode === 'dark');
        }

        {
            /* Remove the event listener when the component is unmounted or the dependency changes */
        }
        return () => {
            darkModeMediaQuery.removeEventListener('change', handleColorSchemeChange);
        };
    }, [colorMode, setColorMode]);
    {
        /* Return the color mode state and the color mode update function */
    }
    return [colorMode, setColorMode];
}
