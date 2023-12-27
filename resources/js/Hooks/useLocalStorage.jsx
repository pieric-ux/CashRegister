import { useState } from "react";

export default function useLocalStorage(key, initialValue) {
    {
        /* Using the `useState` React hook to manage the state of the value stored in localStorage.
      The callback function during the initial state creation retrieves the value stored in localStorage. */
    }
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            {
                /* If a value is already present in localStorage for the specified key,
          parse it as JSON to return as the initial value. */
            }
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            {
                /* In case of an error while retrieving the value, use the provided initial value. */
            }
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            {
                /* If the new value is a function, evaluate it using the current stored value.
          Otherwise, use the new value directly. */
            }
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            {
                /* Update the stored value in the state. */
            }
            setStoredValue(valueToStore);
            {
                /* Store the new value in localStorage, converting it to JSON. */
            }
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {}
    };

    {
        /* The `useLocalStorage` hook returns an array containing the current value stored in localStorage (`storedValue`)
      and the `setValue` function that allows updating this value.
      This enables other components to use these values and functions to manage localStorage in a reactive manner. */
    }

    return [storedValue, setValue];
}
