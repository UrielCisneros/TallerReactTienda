import { useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import toast from 'react-hot-toast';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { QuantityStepper } from '../components/QuantityStepper';
import { CartContext } from '../context/CartContext';
import { formatPrice } from '../utils/format';

export function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalPrecio } =
    useContext(CartContext);

  const listRef = useRef(null);

  useEffect(() => {
    document.title = 'Tu carrito · SoundGear';
  }, []);

  useEffect(() => {
    if (!listRef.current) return;
    gsap.from(listRef.current, { opacity: 0, y: 16, duration: 0.6, ease: 'power2.out' });
  }, []);

  function handleCheckout() {
    toast.success('¡Gracias por tu compra! 🎉');
    clearCart();
  }

  // Renderizado condicional: si no hay nada, ni siquiera pintamos la lista.
  if (items.length === 0) {
    return (
      <div className="page">
        <div className="container empty-state">
          <FiShoppingBag size={40} />
          <p>Tu carrito está vacío.</p>
          <Link to="/" className="btn btn-primary">
            Ver productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="section-title">Tu carrito</h1>

        <div ref={listRef} className="cart-list">
          {items.map((item) => (
            <div key={item.id} className="cart-row">
              <img src={item.imagen} alt={item.nombre} />
              <div className="cart-row-info">
                <h3>{item.nombre}</h3>
                <span className="text-muted">{formatPrice(item.precio)} c/u</span>
              </div>
              <QuantityStepper
                value={item.cantidad}
                onChange={(cantidad) => updateQuantity(item.id, cantidad)}
              />
              <strong className="cart-row-subtotal">
                {formatPrice(item.precio * item.cantidad)}
              </strong>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeItem(item.id)}
                aria-label={`Quitar ${item.nombre}`}
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <span>
            Total: <strong>{formatPrice(totalPrecio)}</strong>
          </span>
          <div className="cart-summary-actions">
            <button type="button" className="btn btn-outline" onClick={clearCart}>
              Vaciar carrito
            </button>
            <button type="button" className="btn btn-primary" onClick={handleCheckout}>
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
