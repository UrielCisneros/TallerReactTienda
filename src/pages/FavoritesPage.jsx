import { useEffect, useMemo } from 'react';
import { ProductGrid } from '../components/ProductGrid';
import { PRODUCTS } from '../data/products';
import { useFavorites } from '../context/FavoritesContext';

export function FavoritesPage() {
  const { favoritos } = useFavorites();

  useEffect(() => {
    document.title = 'Tus favoritos · SoundGear';
  }, []);

  const productosFavoritos = useMemo(
    () => PRODUCTS.filter((producto) => favoritos.includes(producto.id)),
    [favoritos]
  );

  return (
    <div className="page">
      <div className="container">
        <h1 className="section-title">Tus favoritos ({productosFavoritos.length})</h1>
        <ProductGrid productos={productosFavoritos} />
      </div>
    </div>
  );
}
