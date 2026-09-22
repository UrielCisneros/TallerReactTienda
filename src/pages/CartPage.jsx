import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { QuantityStepper } from '../components/QuantityStepper';
import { useCart } from '../context/CartContext';
import { useFadeIn } from '../hooks/useFadeIn';
import { formatPrice } from '../utils/format';

export function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalPrecio } = useCart();
  const listRef = useFadeIn({ y: 16 });

  useEffect(() => {
    document.title = 'Tu carrito · SoundGear';
  }, []);

  function handleCheckout() {
    toast.success('¡Gracias por tu compra! 🎉');
    clearCart();
  }

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
