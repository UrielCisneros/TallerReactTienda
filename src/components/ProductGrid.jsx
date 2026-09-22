import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ProductCard } from './ProductCard';

export function ProductGrid({ productos }) {
  const gridRef = useRef(null);

  // "stagger" = cada tarjeta entra un poquito después que la anterior.
  // Ojo al arreglo de dependencias: al poner [productos], la animación
  // se vuelve a disparar cada vez que cambia el filtro o la búsqueda,
  // no solo al montar el componente.
  useEffect(() => {
    if (!gridRef.current) return;

    gsap.from(gridRef.current.children, {
      opacity: 0,
      y: 20,
      duration: 0.45,
      stagger: 0.06,
      ease: 'power2.out',
    });
  }, [productos]);

  if (productos.length === 0) {
    return (
      <div className="empty-state">
        <p>No encontramos productos con esos filtros.</p>
      </div>
    );
  }

  return (
    <div className="product-grid" ref={gridRef}>
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
}
