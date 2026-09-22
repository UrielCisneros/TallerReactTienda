import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-24">
      <div className="text-center">
        <p className="bg-linear-to-r from-primary to-accent bg-clip-text text-7xl font-extrabold tracking-tight text-transparent sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 text-2xl font-bold">Esta página no existe</h1>
        <p className="mt-2 text-text-muted">
          Puede que el enlace esté roto o que el producto ya no esté disponible.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover hover:shadow-glow active:scale-95"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
