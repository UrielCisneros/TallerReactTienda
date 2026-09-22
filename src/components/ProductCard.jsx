import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { FiShoppingCart } from 'react-icons/fi';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { StarRating } from './StarRating';
import { CartContext } from '../context/CartContext';
import { FavoritesContext } from '../context/FavoritesContext';
import { formatPrice } from '../utils/format';

export function ProductCard({ producto }) {
  const { addItem } = useContext(CartContext);
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);

  const cardRef = useRef(null);
  const favorito = isFavorite(producto.id);

  function handleAgregar(e) {
    e.preventDefault(); // el botón vive dentro de un <Link>, evitamos navegar
    addItem(producto, 1);
    toast.success(`${producto.nombre} agregado al carrito`);

    // Animación disparada por un EVENTO, no por un montaje: no necesita
    // useEffect, simplemente le decimos a GSAP "anima esto ahora".
    gsap.fromTo(
      cardRef.current,
      { scale: 1 },
      { scale: 1.03, duration: 0.12, yoyo: true, repeat: 1, ease: 'power1.inOut' }
    );
  }

  function handleFavorito(e) {
    e.preventDefault();
    toggleFavorite(producto.id);
  }

  return (
    // "group" permite que los hijos reaccionen al hover de la tarjeta
    // entera con group-hover:*  (por ejemplo, el zoom de la imagen).
    <Link
      to={`/producto/${producto.id}`}
      ref={cardRef}
      // IMPORTANTE: la transición está acotada a border-color y box-shadow.
      // No puede incluir transform ni opacity, porque GSAP anima esas dos
      // (la entrada del grid y el rebote al agregar). Si el CSS también
      // intenta interpolarlas, las dos animaciones pelean y se ve trabada.
      className="group relative flex flex-col overflow-hidden rounded-md border border-border bg-surface shadow-card transition-[border-color,box-shadow] duration-300 hover:border-border-strong hover:shadow-lift"
    >
      <div className="relative overflow-hidden">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          loading="lazy"
          className="aspect-square w-full bg-surface-hover object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Degradado sobre la imagen para que el contenido de abajo
            no compita con la foto. */}
        <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/20 to-transparent" />

        <span className="absolute bottom-3 left-3 inline-flex items-center rounded-full border border-white/10 bg-bg/70 px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide text-text-muted backdrop-blur-sm">
          {producto.categoria}
        </span>

        <button
          type="button"
          onClick={handleFavorito}
          aria-label={favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full border border-white/10 bg-bg/60 text-white backdrop-blur-sm transition hover:scale-110 hover:bg-bg/80"
        >
          {favorito ? <FaHeart className="text-danger" /> : <FaRegHeart />}
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 font-semibold transition-colors group-hover:text-primary">
          {producto.nombre}
        </h3>

        <StarRating value={producto.rating} />

        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <strong className="text-lg tracking-tight">
            {formatPrice(producto.precio)}
          </strong>

          <button
            type="button"
            onClick={handleAgregar}
            aria-label={`Agregar ${producto.nombre} al carrito`}
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-primary-hover hover:shadow-glow active:scale-95"
          >
            <FiShoppingCart className="size-4" />
            <span className="hidden lg:inline">Agregar</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
