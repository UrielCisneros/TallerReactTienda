import { useContext, useEffect } from 'react';
import { ProductGrid } from '../components/ProductGrid';
import { PRODUCTS } from '../data/products';
import { FavoritesContext } from '../context/FavoritesContext';

export function FavoritesPage() {
  const { favoritos } = useContext(FavoritesContext);

  useEffect(() => {
    document.title = 'Tus favoritos · SoundGear';
  }, []);

  // "favoritos" solo guarda ids, así que filtramos PRODUCTS para
  // quedarnos con los productos completos.
  const productosFavoritos = PRODUCTS.filter((producto) =>
    favoritos.includes(producto.id)
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
