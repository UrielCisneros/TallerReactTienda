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
      <div className="flex flex-1 items-center justify-center px-4 py-24 text-center">
        <div>
          <h1 className="text-2xl font-bold">No encontramos ese producto</h1>
          <Link
            to="/"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover hover:shadow-glow active:scale-95"
          >
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
      {
        scale: 1.06,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut',
        clearProps: 'transform',
      }
    );
  }

  return (
    <div className="flex-1 pt-6 pb-20">
      <div className="mx-auto w-full max-w-app px-4 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-sm py-2 text-sm text-text-muted transition-colors hover:text-text"
        >
          <FiArrowLeft className="size-4" /> Volver al catálogo
        </Link>

        <div className="mt-6 grid grid-cols-1 items-start gap-10 min-[780px]:grid-cols-[minmax(0,460px)_1fr] min-[780px]:gap-14">
          <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-lift">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="aspect-square w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <span className="inline-flex w-fit items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-text-muted">
                {producto.categoria}
              </span>

              <h1 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
                {producto.nombre}
              </h1>

              <StarRating value={producto.rating} />
            </div>

            <p className="max-w-xl text-pretty leading-relaxed text-text-muted">
              {producto.descripcion}
            </p>

            {/* Panel de compra: agrupa precio y acciones para que se
                lean como un bloque, no como elementos sueltos. */}
            <div className="flex flex-col gap-5 rounded-md border border-border bg-surface/60 p-5 backdrop-blur-sm">
              <div className="flex items-baseline gap-2">
                <strong className="text-3xl font-extrabold tracking-tight">
                  {formatPrice(producto.precio)}
                </strong>
                <span className="text-sm text-text-muted">IVA incluido</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <QuantityStepper value={cantidad} onChange={setCantidad} />

                <button
                  ref={botonRef}
                  type="button"
                  onClick={handleAgregar}
                  // Transición acotada: GSAP anima la escala de este botón
                  // al hacer clic, así que el CSS no debe tocar transform.
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-white transition-[background-color,box-shadow] duration-200 hover:bg-primary-hover hover:shadow-glow"
                >
                  <FiShoppingCart className="size-4" /> Agregar al carrito
                </button>
              </div>

              <button
                type="button"
                onClick={() => toggleFavorite(producto.id)}
                className={`inline-flex items-center justify-center gap-2 rounded-sm border px-5 py-2.5 text-sm font-semibold transition active:scale-95 ${
                  favorito
                    ? 'border-danger/40 bg-danger/10 text-danger'
                    : 'border-border bg-transparent text-text hover:bg-surface-hover'
                }`}
              >
                {favorito ? <FaHeart /> : <FaRegHeart />}
                {favorito ? 'En favoritos' : 'Agregar a favoritos'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
