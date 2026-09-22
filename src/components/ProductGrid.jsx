import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FiSearch } from 'react-icons/fi';
import { ProductCard } from './ProductCard';

export function ProductGrid({ productos }) {
  const gridRef = useRef(null);

  // Las dependencias de useEffect se comparan por IDENTIDAD, no por
  // contenido. "productos" es un arreglo nuevo en cada render de Home,
  // así que usarlo directo relanzaba la animación en cada tecleo, aunque
  // la lista mostrada fuera la misma. Con los ids convertidos a texto,
  // la dependencia solo cambia cuando cambia de verdad lo que se ve.
  const idsVisibles = productos.map((producto) => producto.id).join(',');

  // "stagger" = cada tarjeta entra un poquito después que la anterior.
  useEffect(() => {
    if (!gridRef.current) return;

    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.05,
        ease: 'power2.out',
        overwrite: true, // si ya había una animación corriendo, la reemplaza
        // Al terminar, GSAP borra del style="" lo que escribió. Si no,
        // deja un transform fijo en cada tarjeta que pisaría cualquier
        // efecto de hover hecho con CSS.
        clearProps: 'opacity,transform',
      }
    );
  }, [idsVisibles]);

  if (productos.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-md border border-dashed border-border bg-surface/40 px-6 py-20 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-surface-hover text-text-muted">
          <FiSearch className="size-6" />
        </div>
        <div>
          <p className="font-semibold">No encontramos productos</p>
          <p className="mt-1 text-sm text-text-muted">
            Prueba con otra búsqueda o cambia de categoría.
          </p>
        </div>
      </div>
    );
  }

  return (
    // OJO: las tarjetas deben ser hijas DIRECTAS de este div, porque
    // la animación de arriba usa gridRef.current.children.
    <div
      ref={gridRef}
      className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-5"
    >
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
}
