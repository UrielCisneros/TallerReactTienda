import { createContext, useEffect, useState } from 'react';

/**
 * CONTEXT API — el problema que resuelve
 *
 * Sin Context, para que el botón "Agregar al carrito" (dentro de
 * ProductCard) y el contador del carrito (dentro de Navbar) compartan
 * el mismo estado, tendríamos que subir el estado hasta App y pasarlo
 * por props a través de varios componentes intermedios que ni siquiera
 * lo usan ("prop drilling").
 *
 * Context son 3 piezas, nada más:
 *   1. createContext()  -> crea el "canal"
 *   2. <Context.Provider value={...}>  -> pone datos en el canal
 *   3. useContext(Context)  -> cualquier hijo lee del canal
 */
export const CartContext = createContext();

export function CartProvider({ children }) {
  // 1. Estado normal con useState. La función que le pasamos a useState
  //    solo corre la PRIMERA vez, para leer lo que había en localStorage.
  const [items, setItems] = useState(() => {
    const guardado = localStorage.getItem('soundgear-carrito');
    return guardado ? JSON.parse(guardado) : [];
  });

  // 2. Cada vez que el carrito cambia, lo guardamos en localStorage.
  //    localStorage solo guarda texto, por eso el JSON.stringify.
  useEffect(() => {
    localStorage.setItem('soundgear-carrito', JSON.stringify(items));
  }, [items]);

  function addItem(producto, cantidad = 1) {
    const existente = items.find((item) => item.id === producto.id);

    if (existente) {
      // El producto ya estaba: creamos un arreglo NUEVO con la cantidad sumada.
      setItems(
        items.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        )
      );
    } else {
      setItems([...items, { ...producto, cantidad }]);
    }
  }

  function removeItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  function updateQuantity(id, cantidad) {
    if (cantidad < 1) return;
    setItems(items.map((item) => (item.id === id ? { ...item, cantidad } : item)));
  }

  function clearCart() {
    setItems([]);
  }

  // Valores derivados: NO son estado, se calculan a partir de "items"
  // en cada render. Regla útil: si lo puedes calcular, no lo guardes.
  let totalItems = 0;
  let totalPrecio = 0;

  for (const item of items) {
    totalItems += item.cantidad;
    totalPrecio += item.cantidad * item.precio;
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrecio,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
