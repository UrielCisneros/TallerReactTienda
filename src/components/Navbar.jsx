import { useContext, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';

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
