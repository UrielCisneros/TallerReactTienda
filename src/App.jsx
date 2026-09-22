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
      <span className="rounded-sm border border-border bg-surface px-3 py-1 text-xs font-semibold tracking-widest text-text-muted uppercase">
        Taller de React
      </span>

      <h1 className="text-4xl font-extrabold sm:text-5xl">
        Todo listo para <span className="text-primary">programar</span>
      </h1>

      <p className="max-w-xl text-text-muted">
        Abre{' '}
        <code className="rounded-sm bg-surface px-1.5 py-0.5 text-text">
          src/App.jsx
        </code>{' '}
        y empieza a escribir. Guarda el archivo y el navegador se actualiza
        solo.
      </p>
    </main>
  );
}

export default App;
