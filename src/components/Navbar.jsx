import { useContext, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';

// Clases que comparten los 3 links del menú. Guardarlas en una constante
// evita repetir la misma cadena tres veces.
const linkBase =
  'inline-flex items-center gap-2 rounded-sm px-3 py-2 text-sm transition-colors hover:bg-surface-hover hover:text-text';

export function Navbar() {
  // Así se lee el Context: useContext(NombreDelContext).
  // Navbar NO recibe nada por props y aun así sabe cuántos productos
  // hay en el carrito. Eso es exactamente lo que resuelve Context.
  const { totalItems } = useContext(CartContext);

  const badgeRef = useRef(null);

  // useEffect que reacciona a un cambio de estado que vive en OTRO
  // componente (CartProvider): cada vez que cambia el número, animamos.
  useEffect(() => {
    if (!badgeRef.current) return;

    gsap.fromTo(
      badgeRef.current,
      { scale: 1.6 },
      { scale: 1, duration: 0.35, ease: 'back.out(3)' }
    );
  }, [totalItems]);

  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-app items-center justify-between px-4 sm:px-6">
        <NavLink
          to="/"
          className="text-xl font-extrabold tracking-tight transition-opacity hover:opacity-80"
        >
          Sound
          <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
            Gear
          </span>
        </NavLink>

        <nav className="flex items-center gap-1 font-medium text-text-muted sm:gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'bg-surface-hover text-text' : ''}`
            }
          >
            Inicio
          </NavLink>

          <NavLink
            to="/favoritos"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'bg-surface-hover text-text' : ''}`
            }
          >
            <FiHeart className="size-4" />
            <span className="hidden sm:inline">Favoritos</span>
          </NavLink>

          <NavLink
            to="/carrito"
            className={({ isActive }) =>
              `${linkBase} relative ${isActive ? 'bg-surface-hover text-text' : ''}`
            }
          >
            <FiShoppingCart className="size-4" />
            <span className="hidden sm:inline">Carrito</span>

            {totalItems > 0 && (
              <span
                ref={badgeRef}
                className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[0.7rem] font-bold text-white shadow-glow ring-2 ring-bg"
              >
                {totalItems}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
