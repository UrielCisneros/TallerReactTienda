import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { ProductGrid } from '../components/ProductGrid';
import { CATEGORIES, PRODUCTS } from '../data/products';

export function Home() {
  // --- Hora 2: estado local con useState ---
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('Todos');

  // --- Hora 3: useEffect para un efecto secundario simple (side effect) ---
  // El [] vacío significa "corre solo una vez, al montar el componente".
  useEffect(() => {
    document.title = 'SoundGear · Equipo de audio para producción';
  }, []);

  // --- Hora 5: useRef apunta a un elemento del DOM para animarlo con GSAP ---
  const heroRef = useRef(null);

  // fromTo = "desde este estado" -> "hasta este otro".
  // Siempre declaramos el estado final (opacity: 1, y: 0) en vez de usar
  // gsap.from, que lo adivina leyendo el DOM. Así la animación termina
  // igual aunque el efecto corra dos veces (React lo hace a propósito en
  // modo desarrollo con <StrictMode>).
  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
  }, []);

  // Filtrado: una variable normal, calculada en cada render.
  // No necesita useState ni useEffect porque se deduce de "busqueda" y
  // "categoria", que sí son estado.
  const productosFiltrados = PRODUCTS.filter((producto) => {
    const coincideCategoria = categoria === 'Todos' || producto.categoria === categoria;
    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.trim().toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  return (
    <div className="flex-1 pb-20">
      <div className="mx-auto w-full max-w-app px-4 sm:px-6">
        {/* Barra de herramientas: búsqueda + filtros, agrupadas en un
            panel para que se lean como una sola unidad. */}
        <div className="mb-10 flex flex-col gap-4 rounded-md border mt-4 border-border bg-surface/50 p-4 backdrop-blur-sm">
          <SearchBar value={busqueda} onChange={setBusqueda} />
          <CategoryFilter
            categorias={CATEGORIES}
            seleccionada={categoria}
            onSelect={setCategoria}
          />
        </div>

        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            {categoria === 'Todos' ? 'Todos los productos' : categoria}
          </h2>
          <span className="shrink-0 text-sm text-text-muted">
            {productosFiltrados.length}{' '}
            {productosFiltrados.length === 1 ? 'resultado' : 'resultados'}
          </span>
        </div>

        <ProductGrid productos={productosFiltrados} />
      </div>
    </div>
  );
}
