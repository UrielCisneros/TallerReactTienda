import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Anima en cascada (stagger) a los hijos directos del elemento referenciado.
 * Ideal para grids de tarjetas: cada tarjeta aparece un poquito después
 * que la anterior en vez de todas a la vez.
 *
 * `deps` es la pieza clave: al pasarle, por ejemplo, la lista de productos
 * filtrados, la animación se vuelve a disparar cada vez que cambia el
 * filtro o la búsqueda, no solo quiero al montar el componente. Este es
 * un buen ejemplo en vivo de "por qué importa el arreglo de dependencias
 * de useEffect".
 */
export function useStaggerReveal(deps = []) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(containerRef.current.children, {
        opacity: 0,
        y: 20,
        duration: 0.45,
        stagger: 0.06,
        ease: 'power2.out',
      });
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}
