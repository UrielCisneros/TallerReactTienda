import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Pantalla de carga: un ecualizador de audio animado.
 *
 * El componente se encarga de TODO por su cuenta: se muestra durante
 * `ms` milisegundos y, cuando termina, deja pasar lo que traiga adentro.
 * Quien lo usa solo tiene que envolver su página:
 *
 *   <Loader ms={1600}>
 *     <Home />
 *   </Loader>
 *
 * `children` es una prop especial de React: es "todo lo que pusiste
 * entre la etiqueta de apertura y la de cierre". Ya la vieron en
 * CartProvider, es exactamente el mismo patrón.
 *
 * `ms = 1600` es un valor por defecto: si no le pasas la prop, usa ese.
 */
export function Loader({ ms = 1600, children = null }) {
  const [cargando, setCargando] = useState(true);
  const barrasRef = useRef(null);
  const textoRef = useRef(null);

  // Efecto 1: el temporizador que decide cuándo dejar de cargar.
  useEffect(() => {
    // Los productos son datos locales, así que no hay nada que esperar
    // de verdad: simulamos la carga. En una app real, aquí esperarías
    // la respuesta de una API.
    const temporizador = setTimeout(() => setCargando(false), ms);

    // CLEANUP: cancelamos el temporizador si el componente desaparece
    // antes de que se cumpla el tiempo. Es también lo que hace que esto
    // funcione bien con <StrictMode>, que monta todo dos veces.
    return () => clearTimeout(temporizador);
  }, [ms]);

  // Efecto 2: las animaciones de GSAP.
  useEffect(() => {
    if (!barrasRef.current) return;

    // .children son los 5 <span> de adentro. GSAP acepta una lista de
    // elementos y los anima todos con una sola llamada.
    const barras = barrasRef.current.children;

    const ecualizador = gsap.fromTo(
      barras,
      { scaleY: 0.2 },
      {
        scaleY: 1,
        duration: 0.5,
        ease: 'sine.inOut',
        stagger: 0.12, // cada barra arranca 0.12s después que la anterior
        repeat: -1, // -1 significa "repetir para siempre"
        yoyo: true, // al llegar al final, la reproduce en reversa
      }
    );

    const pulso = gsap.fromTo(
      textoRef.current,
      { opacity: 0.35 },
      { opacity: 1, duration: 0.9, ease: 'sine.inOut', repeat: -1, yoyo: true }
    );

    // CLEANUP: las dos animaciones son infinitas (repeat: -1), así que
    // hay que detenerlas a mano. Si no, GSAP seguiría animando elementos
    // que ya no están en la pantalla.
    return () => {
      ecualizador.kill();
      pulso.kill();
    };
  }, []);

  // Ya terminó de cargar: mostramos la página en vez del ecualizador.
  if (!cargando) {
    return children;
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-7 bg-bg">
      {/* Resplandor detrás del ecualizador. Va FUERA del contenedor de
          las barras: si estuviera dentro, GSAP lo animaría como una
          barra más (usa barrasRef.current.children). */}
      <div className="relative flex items-center justify-center">
        <div className="absolute size-40 rounded-full bg-primary/20 blur-3xl" />

        {/* Las 5 barras son idénticas: GSAP se encarga de desfasarlas.
            origin-bottom hace que crezcan desde abajo, como un
            ecualizador de verdad. */}
        <div ref={barrasRef} className="relative flex h-[76px] items-end gap-[9px]">
          <span className="block h-full w-2.5 origin-bottom rounded-full bg-linear-to-t from-primary to-accent" />
          <span className="block h-full w-2.5 origin-bottom rounded-full bg-linear-to-t from-primary to-accent" />
          <span className="block h-full w-2.5 origin-bottom rounded-full bg-linear-to-t from-primary to-accent" />
          <span className="block h-full w-2.5 origin-bottom rounded-full bg-linear-to-t from-primary to-accent" />
          <span className="block h-full w-2.5 origin-bottom rounded-full bg-linear-to-t from-primary to-accent" />
        </div>
      </div>

      <p
        ref={textoRef}
        className="m-0 text-lg font-extrabold tracking-[0.25em] uppercase"
      >
        Sound
        <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
          Gear
        </span>
      </p>
    </div>
  );
}
