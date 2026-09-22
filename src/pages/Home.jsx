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

  useEffect(() => {
    gsap.from(heroRef.current, { opacity: 0, y: 16, duration: 0.6, ease: 'power2.out' });
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
