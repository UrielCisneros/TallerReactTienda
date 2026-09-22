# Taller de React + Vite — proyecto base

Cascarón listo para empezar a programar en el taller. Trae el entorno ya
armado (Vite, Tailwind, Router, GSAP, toasts, iconos y datos de ejemplo),
pero **sin la app hecha**: esa la construimos durante las 6 horas del taller.

La guía completa, hora por hora, está en [`GUIA_TALLER.md`](./GUIA_TALLER.md).

## Requisitos

- [Node.js](https://nodejs.org) 20 o superior
- [pnpm](https://pnpm.io/installation) (`npm install -g pnpm`)

## Cómo empezar

```bash
pnpm i
pnpm dev
```

Abre la URL que imprime Vite (por defecto `http://localhost:5173`) y edita
[`src/App.jsx`](./src/App.jsx). Al guardar, el navegador se actualiza solo.

Otros comandos:

```bash
pnpm build    # build de producción
pnpm preview  # sirve el build de producción localmente
pnpm lint     # linting con oxlint
```

## Qué trae ya instalado

- **React 19 + Vite** — herramienta de build y dev server.
- **React Router** — `main.jsx` ya envuelve la app en `<BrowserRouter>`, solo
  faltan tus `<Routes>`.
- **Tailwind CSS v4** — estilos con utilidades en el JSX. Se configura desde
  `src/index.css` (bloque `@theme`), sin `tailwind.config.js`.
- **GSAP** — animaciones.
- **react-hot-toast** — notificaciones.
- **react-icons** — iconografía.
- **oxlint** — linter.

## Estructura

```
src/
├─ App.jsx        # componente raíz: aquí empiezas
├─ main.jsx       # arranque de la app (StrictMode + BrowserRouter)
├─ index.css      # Tailwind + tokens del diseño
├─ components/    # (vacía) piezas de UI reutilizables
├─ pages/         # (vacía) una página por ruta
├─ context/       # (vacía) estado global con Context API
├─ data/          # productos de ejemplo (mock data)
├─ utils/         # helpers puros (formato de moneda)
└─ assets/        # (vacía) imágenes y estáticos importados
```

Las carpetas vacías traen un archivo `.gitkeep` para que git las conserve;
puedes borrarlo en cuanto agregues tu primer archivo.

## Datos de ejemplo

[`src/data/products.js`](./src/data/products.js) exporta `PRODUCTS` (20
productos con `id`, `nombre`, `categoria`, `precio`, `rating`, `descripcion`
e `imagen`) y `CATEGORIES`. Es mock data: en una app real vendría de una API,
pero aquí nos interesa el frontend, no montar un backend.

```js
import { PRODUCTS, CATEGORIES } from './data/products';
```

## Estilos

No hay un CSS por componente: cada componente lleva sus clases de Tailwind en
el `className`. El único CSS del proyecto es
[`src/index.css`](./src/index.css), que hace dos cosas:

1. `@import "tailwindcss"` — trae las utilidades.
2. `@theme { ... }` — define los tokens del diseño (colores, radios, sombras,
   ancho máximo, tipografía). Tailwind genera las utilidades a partir de los
   nombres: `--color-primary` produce `bg-primary`, `text-primary`,
   `border-primary`, etc.

Para cambiarle la paleta al proyecto entero, se editan esos tokens y nada más.
