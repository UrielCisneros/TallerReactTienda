import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import gsap from 'gsap';
import toast from 'react-hot-toast';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi';
import { StarRating } from '../components/StarRating';
import { QuantityStepper } from '../components/QuantityStepper';
import { PRODUCTS } from '../data/products';
import { CartContext } from '../context/CartContext';
import { FavoritesContext } from '../context/FavoritesContext';
import { formatPrice } from '../utils/format';

export function ProductPage() {
  // useParams lee ":id" desde la URL, ej: /producto/3 -> id === "3"
  // Viene como texto, por eso el Number(id) para comparar con el id numérico.
  const { id } = useParams();
  const producto = PRODUCTS.find((p) => p.id === Number(id));

  const [cantidad, setCantidad] = useState(1);
  const { addItem } = useContext(CartContext);
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);

  const botonRef = useRef(null);

  useEffect(() => {
    document.title = producto ? `${producto.nombre} · SoundGear` : 'Producto no encontrado';
  }, [producto]);

  if (!producto) {
    return (
      <div className="page">
        <div className="container empty-state">
          <p>No encontramos ese producto.</p>
          <Link to="/" className="btn btn-primary">
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  const favorito = isFavorite(producto.id);

  function handleAgregar() {
    addItem(producto, cantidad);
    toast.success(`${cantidad} × ${producto.nombre} agregado al carrito`);

    // Animación por evento: se dispara al hacer clic, no necesita useEffect.
    gsap.fromTo(
      botonRef.current,
      { scale: 1 },
      { scale: 1.06, duration: 0.15, yoyo: true, repeat: 1, ease: 'power1.inOut' }
    );
  }

  return (
    <div className="page">
      <div className="container">
        <Link to="/" className="back-link">
          <FiArrowLeft /> Volver al catálogo
        </Link>

        <div className="product-detail">
          <img src={producto.imagen} alt={producto.nombre} />

          <div className="product-detail-info">
            <span className="badge">{producto.categoria}</span>
            <h1>{producto.nombre}</h1>
            <StarRating value={producto.rating} />
            <p className="product-detail-desc">{producto.descripcion}</p>
            <strong className="product-detail-price">{formatPrice(producto.precio)}</strong>

            <div className="product-detail-actions">
              <QuantityStepper value={cantidad} onChange={setCantidad} />
              <button ref={botonRef} type="button" className="btn btn-primary" onClick={handleAgregar}>
                <FiShoppingCart /> Agregar al carrito
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => toggleFavorite(producto.id)}
              >
                {favorito ? <FaHeart color="var(--color-danger)" /> : <FaRegHeart />}
                {favorito ? 'En favoritos' : 'Agregar a favoritos'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
