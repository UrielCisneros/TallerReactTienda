import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Loader } from "./components/Loader";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { ProductPage } from "./pages/ProductPage";
import { CartPage } from "./pages/CartPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { NotFound } from "./pages/NotFound";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";

/**
 * Los Providers envuelven TODA la app aquí arriba, en el componente raíz.
 * Así, cualquier componente en cualquier página (Navbar, ProductCard,
 * CartPage...) puede leer el carrito y los favoritos con useContext,
 * sin recibir nada por props.
 *
 * PANTALLA DE CARGA
 * Cada ruta decide si quiere una: basta con envolver su página en
 * <Loader>. El carrito y favoritos no la usan, y aparecen al instante.
 *
 * Ojo a un detalle importante: el <Loader> va POR FUERA de la página,
 * nunca adentro. Así la página no se monta hasta que termina la carga,
 * y sus animaciones de entrada (el hero de Home, el stagger del grid)
 * se reproducen justo cuando el usuario empieza a verlas. Si el Loader
 * estuviera dentro de Home, el useEffect del hero correría antes de que
 * el elemento existiera y heroRef.current sería null.
 */
function App() {
  return (
    <Loader ms={1600}>
      <CartProvider>
        <FavoritesProvider>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/producto/:id" element={<ProductPage />} />
            <Route path="/carrito" element={<CartPage />} />
            <Route path="/favoritos" element={<FavoritesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />

          {/* Librería #4: notificaciones "toast" con una sola línea. */}
          <Toaster position="bottom-center" toastOptions={{ duration: 2500 }} />
        </FavoritesProvider>
      </CartProvider>
    </Loader>
  );
}

export default App;
