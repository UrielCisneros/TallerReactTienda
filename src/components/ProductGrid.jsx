import { ProductCard } from './ProductCard';
import { useStaggerReveal } from '../hooks/useStaggerReveal';

export function ProductGrid({ productos }) {
  // Se re-anima cada vez que cambia la lista de productos (filtro, búsqueda...).
  const gridRef = useStaggerReveal([productos]);

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
