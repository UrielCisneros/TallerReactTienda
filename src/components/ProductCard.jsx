import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { FiShoppingCart } from 'react-icons/fi';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { StarRating } from './StarRating';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { formatPrice } from '../utils/format';

export function ProductCard({ producto }) {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
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
    <Link to={`/producto/${producto.id}`} className="product-card" ref={cardRef}>
      <button
        type="button"
        className="favorite-btn"
        onClick={handleFavorito}
        aria-label={favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        {favorito ? <FaHeart color="var(--color-danger)" /> : <FaRegHeart />}
      </button>

      <img src={producto.imagen} alt={producto.nombre} loading="lazy" />

      <div className="product-card-body">
        <span className="badge">{producto.categoria}</span>
        <h3>{producto.nombre}</h3>
        <StarRating value={producto.rating} />
        <div className="product-card-footer">
          <strong>{formatPrice(producto.precio)}</strong>
          <button type="button" className="btn btn-primary" onClick={handleAgregar}>
            <FiShoppingCart /> Agregar
          </button>
        </div>
      </div>
    </Link>
  );
}
