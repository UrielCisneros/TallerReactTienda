import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

/**
 * Arranque de la app. Normalmente no se toca este archivo.
 *
 * - StrictMode: avisos de React en desarrollo (por eso los efectos
 *   se ejecutan dos veces al montar; en producción no pasa).
 * - BrowserRouter: habilita el enrutado. Ya está puesto para que solo
 *   tengas que declarar tus <Routes> dentro de App.jsx.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
