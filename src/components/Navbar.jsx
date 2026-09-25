import { NavLink } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";


export const Navbar = () => {
  const LinkClassName =
    "inline-flex items-center gap-2 rounded-sm px-3 py-2 text-sm transition-colors hover:bg-surface-hover hover:text-text";
  return (
    <header className="sticky flex top-0 z-20 border-b border-border/80 bg-bg/70 backdrop-blur-xl mb-5">
      <div className="mx-auto flex h-16 w-full max-w-app items-center justify-between px-4 sm:px-6">
        <NavLink>
          Sound
          <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
            Gear
          </span>
        </NavLink>
      </div>

      <nav className="flex items-center gap-1 font-medium ext-text-muted sm:gap-2">
        <NavLink to="/" className={`${LinkClassName}`}>
          Inicio
        </NavLink>
        <NavLink to="/favorites" className={`${LinkClassName}`}>
          Favoritos
        </NavLink>
        <NavLink to="/cart" className={`${LinkClassName}`}>
          <FiShoppingCart className="size-4" />
          Carrito
        </NavLink>
      </nav>
    </header>
  );
};
