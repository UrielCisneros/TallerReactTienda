import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

/**
 * Mismo patrón que CartContext, a propósito: una vez que el grupo entiende
 * "Context + custom hook + useLocalStorage" en el carrito, este archivo
 * es ideal para que ellos lo repliquen en vivo durante la Hora 6.
 */
const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favoritos, setFavoritos] = useLocalStorage('soundgear-favoritos', []);

  function toggleFavorite(id) {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  }

  function isFavorite(id) {
    return favoritos.includes(id);
  }

  const value = { favoritos, toggleFavorite, isFavorite };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de <FavoritesProvider>');
  }
  return context;
}
