# SoundGear — Proyecto para taller de React + Vite

Mini tienda en línea (estilo Amazon) de equipo de audio, construida como
proyecto guía para un taller de programación de 6 horas. Cubre componentes,
props, hooks (`useState`, `useEffect`, `useContext` y `useRef`), enrutamiento
con React Router, animaciones con GSAP, notificaciones con react-hot-toast y
persistencia en `localStorage`.

El código está escrito a propósito con el mínimo de abstracciones (sin custom
hooks, sin `useMemo`, sin `useReducer`): la idea es que cada componente se
pueda leer de arriba a abajo sin saltar entre archivos.

La guía completa hora por hora está en [`GUIA_TALLER.md`](./GUIA_TALLER.md).

## Requisitos

- Node.js 18 o superior
- npm

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre la URL que imprime Vite (por defecto `http://localhost:5173`).

Otros comandos:

```bash
npm run build    # build de producción
npm run preview  # sirve el build de producción localmente
npm run lint     # linting con oxlint
```

## Stack

- **React 19 + Vite** — herramienta de build y dev server.
- **React Router** — navegación entre Inicio, Detalle de producto, Carrito y Favoritos.
- **Context API** (`CartContext`, `FavoritesContext`) — estado global sin prop drilling, en su forma más básica: `createContext` + `Provider` + `useContext`.
- **GSAP** — animaciones de entrada, stagger y micro-interacciones, escritas con `useRef` + `useEffect` dentro de cada componente.
- **react-hot-toast** — notificaciones.
- **react-icons** — iconografía.
- **CSS plano con variables** — sin frameworks de estilos, para mantener el foco en React/JS.

## Estructura

```
src/
├─ components/   # piezas de UI reutilizables (props, sin lógica de negocio)
├─ pages/        # una página por ruta
├─ context/      # Context API (carrito y favoritos) + persistencia
├─ data/         # datos mock de productos
└─ utils/        # helpers puros (formato de moneda)
```
# TallerReactTienda
