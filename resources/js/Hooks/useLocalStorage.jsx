import { useState } from "react";

export default function useLocalStorage(key, initialValue) {
  {/* Utilisation du hook `useState` de React pour gérer l'état de la valeur stockée dans le localStorage.
      La fonction de rappel lors de la création du state initial récupère la valeur stockée dans le localStorage. */ }
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      {/* Si une valeur est déjà présente dans le localStorage pour la clé spécifiée,
          on la parse en JSON pour la retourner comme valeur initiale. */}
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      {/* En cas d'erreur lors de la récupération de la valeur, on utilise la valeur initiale fournie. */ }
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      {/* Si la nouvelle valeur est une fonction, on l'évalue en utilisant la valeur actuelle stockée.
          Sinon, on utilise directement la nouvelle valeur. */}
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      {/* Mise à jour de la valeur stockée dans le state. */ }
      setStoredValue(valueToStore);
      {/* Stockage de la nouvelle valeur dans le localStorage, en la convertissant en JSON. */ }
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) { }
  };

  {/* Le hook `useLocalStorage` retourne un tableau contenant la valeur actuelle stockée dans le localStorage (`storedValue`)
      et la fonction `setValue` qui permet de mettre à jour cette valeur.
      Cela permet à d'autres composants d'utiliser ces valeurs et fonctions pour gérer le localStorage de manière réactive. */}

  return [storedValue, setValue];
}