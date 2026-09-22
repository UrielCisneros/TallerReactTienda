import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
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
    <div className="flex-1 pt-10 pb-20">
      <div className="mx-auto w-full max-w-app px-4 sm:px-6">
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Tus favoritos
          </h1>
          <span className="shrink-0 text-sm text-text-muted">
            {productosFavoritos.length}{' '}
            {productosFavoritos.length === 1 ? 'producto' : 'productos'}
          </span>
        </div>

        {productosFavoritos.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-md border border-dashed border-border bg-surface/40 px-6 py-20 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-surface-hover text-text-muted">
              <FiHeart className="size-6" />
            </div>
            <div>
              <p className="font-semibold">Todavía no tienes favoritos</p>
              <p className="mt-1 text-sm text-text-muted">
                Toca el corazón de un producto para guardarlo aquí.
              </p>
            </div>
            <Link
              to="/"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover hover:shadow-glow active:scale-95"
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <ProductGrid productos={productosFavoritos} />
        )}
      </div>
    </div>
  );
}
