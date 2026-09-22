import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { NotFound } from './pages/NotFound';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';

/**
 * Los Providers envuelven TODA la app aquí arriba, en el componente raíz.
 * Así, cualquier componente en cualquier página (Navbar, ProductCard,
 * CartPage...) puede leer el carrito y los favoritos con useContext,
 * sin recibir nada por props.
 */
function App() {
  return (
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
  );
}

export default App;
