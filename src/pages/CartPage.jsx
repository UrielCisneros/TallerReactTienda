import { useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import toast from 'react-hot-toast';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { QuantityStepper } from '../components/QuantityStepper';
import { CartContext } from '../context/CartContext';
import { formatPrice } from '../utils/format';

const btnPrimario =
  'inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover hover:shadow-glow active:scale-95';

export function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalPrecio } =
    useContext(CartContext);

  const listRef = useRef(null);

  useEffect(() => {
    document.title = 'Tu carrito · SoundGear';
  }, []);

  useEffect(() => {
    if (!listRef.current) return;
    gsap.fromTo(
      listRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
  }, []);

  function handleCheckout() {
    toast.success('¡Gracias por tu compra! 🎉');
    clearCart();
  }

  // Renderizado condicional: si no hay nada, ni siquiera pintamos la lista.
  if (items.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-24">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-surface text-text-muted">
            <FiShoppingBag className="size-7" />
          </div>
          <div>
            <p className="text-lg font-semibold">Tu carrito está vacío</p>
            <p className="mt-1 text-sm text-text-muted">
              Agrega algo de equipo y vuelve por aquí.
            </p>
          </div>
          <Link to="/" className={`${btnPrimario} mt-2`}>
            Ver productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 pt-10 pb-20">
      <div className="mx-auto w-full max-w-app px-4 sm:px-6">
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Tu carrito</h1>
          <span className="shrink-0 text-sm text-text-muted">
            {items.length} {items.length === 1 ? 'producto' : 'productos'}
          </span>
        </div>

        <div ref={listRef} className="grid gap-8 min-[900px]:grid-cols-[1fr_320px]">
          {/* Lista de productos */}
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center gap-4 rounded-md border border-border bg-surface p-4 transition-colors hover:border-border-strong"
              >
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="size-20 shrink-0 rounded-sm object-cover"
                />

                <div className="min-w-[140px] flex-1">
                  <h3 className="font-semibold">{item.nombre}</h3>
                  <span className="text-sm text-text-muted">
                    {formatPrice(item.precio)} c/u
                  </span>
                </div>

                <QuantityStepper
                  value={item.cantidad}
                  onChange={(cantidad) => updateQuantity(item.id, cantidad)}
                />

                <strong className="min-w-24 text-right text-lg tracking-tight">
                  {formatPrice(item.precio * item.cantidad)}
                </strong>

                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Quitar ${item.nombre}`}
                  className="flex size-9 items-center justify-center rounded-sm text-text-muted transition hover:bg-danger/10 hover:text-danger active:scale-90"
                >
                  <FiTrash2 className="size-4" />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={clearCart}
              className="mt-1 self-start text-sm font-medium text-text-muted transition-colors hover:text-danger"
            >
              Vaciar carrito
            </button>
          </div>

          {/* Resumen: se queda fijo al hacer scroll en pantallas grandes */}
          <aside className="h-fit rounded-md border border-border bg-surface p-6 min-[900px]:sticky min-[900px]:top-24">
            <h2 className="text-lg font-bold">Resumen</h2>

            <dl className="mt-5 flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-text-muted">Subtotal</dt>
                <dd>{formatPrice(totalPrecio)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text-muted">Envío</dt>
                <dd className="text-success">Gratis</dd>
              </div>
            </dl>

            <div className="mt-5 flex items-baseline justify-between border-t border-border pt-5">
              <span className="font-semibold">Total</span>
              <strong className="text-2xl font-extrabold tracking-tight">
                {formatPrice(totalPrecio)}
              </strong>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className={`${btnPrimario} mt-6 w-full py-3`}
            >
              Finalizar compra
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
