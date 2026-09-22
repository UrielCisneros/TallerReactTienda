import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Hook personalizado que combina useRef + useEffect + GSAP.
 *
 * Devuelve un `ref`: lo conectas al elemento que quieres animar y el
 * hook se encarga de animarlo apenas aparece en pantalla.
 *
 * Por qué gsap.context(): agrupa las animaciones creadas dentro de la
 * función y nos da un ".revert()" para limpiarlas en el cleanup de
 * useEffect. Sin esto, si el componente se desmonta a mitad de la
 * animación (por ejemplo al cambiar de ruta), podríamos dejar procesos
 * de GSAP corriendo sobre un nodo del DOM que ya no existe.
 */
export function useFadeIn({ y = 24, duration = 0.6, delay = 0 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y,
        duration,
        delay,
        ease: 'power2.out',
      });
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
