import { useEffect, useState } from 'react';

/**
 * Hook personalizado: useLocalStorage
 *
 * Concepto clave del taller: un "custom hook" no es magia, es una función
 * normal que empieza con "use" y por dentro usa otros hooks (useState,
 * useEffect...). Sirve para reutilizar lógica con estado entre componentes.
 *
 * Se comporta como useState, pero además:
 *  1. Al montar, lee el valor inicial desde localStorage (si existe).
 *  2. Cada vez que el estado cambia, lo vuelve a guardar en localStorage.
 *
 * Así cualquier componente puede tener estado "persistente" con una sola línea:
 *   const [carrito, setCarrito] = useLocalStorage('carrito', []);
 */
export function useLocalStorage(key, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const guardado = window.localStorage.getItem(key);
      return guardado !== null ? JSON.parse(guardado) : valorInicial;
    } catch (error) {
      console.warn(`No se pudo leer "${key}" de localStorage`, error);
      return valorInicial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(valor));
    } catch (error) {
      console.warn(`No se pudo guardar "${key}" en localStorage`, error);
    }
  }, [key, valor]);

  return [valor, setValor];
}
