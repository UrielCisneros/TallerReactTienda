import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="page">
      <div className="container empty-state">
        <h1>404</h1>
        <p>Esta página no existe.</p>
        <Link to="/" className="btn btn-primary">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
