import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

/**
 * CONTEXT API — el problema que resuelve
 *
 * Sin Context, para que el botón "Agregar al carrito" (dentro de
 * ProductCard) y el contador del carrito (dentro de Navbar) compartan
 * el mismo estado, tendríamos que subir el estado hasta App y pasarlo
 * por props a través de varios componentes intermedios que ni siquiera
 * lo usan ("prop drilling").
 *
 * Con Context creamos un "canal" al que cualquier componente hijo puede
 * suscribirse directamente, sin importar cuántos niveles de profundidad
 * haya entre medio.
 */
const CartContext = createContext(null);

export function CartProvider({ children }) {
  // El carrito persiste en localStorage gracias al hook del hour 4.
  const [items, setItems] = useLocalStorage('soundgear-carrito', []);

  function addItem(producto, cantidad = 1) {
    setItems((prev) => {
      const existente = prev.find((item) => item.id === producto.id);

      if (existente) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }

      return [...prev, { ...producto, cantidad }];
    });
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function updateQuantity(id, cantidad) {
    if (cantidad < 1) return;
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cantidad } : item))
    );
  }

  function clearCart() {
    setItems([]);
  }

  // useMemo evita recalcular estos totales en cada render si "items"
  // no cambió. Con pocos productos no se nota, pero es el lugar
  // correcto para mencionar el concepto de memoización.
  const { totalItems, totalPrecio } = useMemo(() => {
    return items.reduce(
      (acc, item) => ({
        totalItems: acc.totalItems + item.cantidad,
        totalPrecio: acc.totalPrecio + item.cantidad * item.precio,
      }),
      { totalItems: 0, totalPrecio: 0 }
    );
  }, [items]);

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrecio,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * Custom hook para consumir el contexto. Encapsula el useContext y
 * además avisa con un error claro si alguien lo usa fuera del Provider,
 * en vez de fallar con un mensaje críptico más adelante.
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de <CartProvider>');
  }
  return context;
}
