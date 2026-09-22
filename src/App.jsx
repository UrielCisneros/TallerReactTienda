/**
 * Punto de partida del taller.
 *
 * Este archivo es el componente raíz: todo lo que construyamos cuelga de aquí.
 * Bórralo sin miedo y empieza a escribir tu propia app.
 *
 * Ya está listo (no hace falta instalar nada más):
 *   - React 19 + Vite
 *   - Tailwind v4 con los tokens del diseño en src/index.css
 *   - React Router (main.jsx ya envuelve la app en <BrowserRouter>)
 *   - GSAP, react-hot-toast y react-icons
 *   - Datos de ejemplo en src/data/products.js
 *
 * Carpetas sugeridas:
 *   src/components/  piezas de UI reutilizables (reciben props)
 *   src/pages/       una página por ruta
 *   src/context/     estado global (carrito, favoritos...)
 *   src/utils/       funciones puras (formatear precios, etc.)
 */
function App() {
  return (
    <main className="mx-auto flex w-full max-w-app flex-1 flex-col items-center justify-center gap-4 px-4 py-20 text-center">
      <h1 className="text-4xl font-extrabold sm:text-5xl">
        Proyecto funcionando <span className="text-primary">a programar</span>
      </h1>
    </main>
  );
}

export default App;
