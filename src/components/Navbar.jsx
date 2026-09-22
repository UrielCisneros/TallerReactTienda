import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export function Navbar() {
  const { totalItems } = useCart();
  const badgeRef = useRef(null);
  const primerRenderRef = useRef(true);

  // useEffect que reacciona a un cambio de estado que vive en OTRO
  // componente (CartProvider). Buen ejemplo de cómo Context "conecta"
  // partes de la app que no son padre-hijo directo.
  useEffect(() => {
    if (primerRenderRef.current) {
      // Evitamos animar en el primer render, solo cuando el número cambia de verdad.
      primerRenderRef.current = false;
      return;
    }
    if (!badgeRef.current) return;

    gsap.fromTo(
      badgeRef.current,
      { scale: 1.6 },
      { scale: 1, duration: 0.35, ease: 'back.out(3)' }
    );
  }, [totalItems]);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-logo">
          Sound<span>Gear</span>
        </NavLink>

        <nav className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Inicio
          </NavLink>
          <NavLink to="/favoritos" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FiHeart /> Favoritos
          </NavLink>
          <NavLink to="/carrito" className={({ isActive }) => (isActive ? 'active' : '')}>
            <span className="cart-link">
              <FiShoppingCart /> Carrito
              {totalItems > 0 && (
                <span ref={badgeRef} className="cart-badge">
                  {totalItems}
                </span>
              )}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
