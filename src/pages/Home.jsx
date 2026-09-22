import { useEffect, useMemo, useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { ProductGrid } from '../components/ProductGrid';
import { useFadeIn } from '../hooks/useFadeIn';
import { CATEGORIES, PRODUCTS } from '../data/products';

export function Home() {
  // --- Hora 2: estado local con useState ---
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('Todos');
  const heroRef = useFadeIn({ y: 16 });

  // --- Hora 3: useEffect para un efecto secundario simple (side effect) ---
  useEffect(() => {
    document.title = 'SoundGear · Equipo de audio para producción';
  }, []);

  // --- Hora 6: useMemo para no recalcular el filtrado en cada render ---
  // que no tenga que ver con búsqueda/categoría (por ejemplo, si el padre
  // se re-renderiza por otra razón).
  const productosFiltrados = useMemo(() => {
    return PRODUCTS.filter((producto) => {
      const coincideCategoria = categoria === 'Todos' || producto.categoria === categoria;
      const coincideBusqueda = producto.nombre
        .toLowerCase()
        .includes(busqueda.trim().toLowerCase());
      return coincideCategoria && coincideBusqueda;
    });
  }, [busqueda, categoria]);

  return (
    <div className="page">
      <div className="container">
        <section ref={heroRef} className="hero">
          <h1>Equipa tu estudio</h1>
          <p>
            Auriculares, controladores, interfaces y sintetizadores para llevar tus
            producciones al siguiente nivel.
          </p>
        </section>

        <div className="toolbar">
          <SearchBar value={busqueda} onChange={setBusqueda} />
          <CategoryFilter
            categorias={CATEGORIES}
            seleccionada={categoria}
            onSelect={setCategoria}
          />
        </div>

        <h2 className="section-title">
          {categoria === 'Todos' ? 'Todos los productos' : categoria}{' '}
          <span className="text-muted">({productosFiltrados.length})</span>
        </h2>

        <ProductGrid productos={productosFiltrados} />
      </div>
    </div>
  );
}
