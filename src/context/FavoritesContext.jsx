import { createContext, useEffect, useState } from 'react';

/**
 * Mismo patrón que CartContext, a propósito: una vez que el grupo entiende
 * "createContext + Provider + useContext" en el carrito, este archivo es
 * ideal para que ellos lo repliquen en vivo durante la Hora 6.
 *
 * Aquí solo guardamos los IDs de los productos favoritos, no el producto
 * completo. Con el id podemos buscar el producto en PRODUCTS cuando lo
 * necesitemos.
 */
export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favoritos, setFavoritos] = useState(() => {
    const guardado = localStorage.getItem('soundgear-favoritos');
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('soundgear-favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  function toggleFavorite(id) {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((favId) => favId !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  }

  function isFavorite(id) {
    return favoritos.includes(id);
  }

  return (
    <FavoritesContext.Provider value={{ favoritos, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
