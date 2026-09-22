# Guía del taller — React + Vite (6 horas)

Proyecto: **SoundGear**, una mini tienda de equipo de audio (catálogo, detalle
de producto, carrito y favoritos persistidos en `localStorage`). La idea es
que el/la instructor(a) vaya construyendo esto **en vivo**, explicando cada
concepto según se necesita, en vez de mostrar el código ya terminado.

Este repo ya está completo y probado — úsalo como "respuesta" a la que
puedes volver en cualquier momento, o como punto de partida si prefieres
hacer un `git init` y armar el proyecto commit por commit durante el taller.

Ritmo sugerido: 6 bloques de ~50 min + 10 min de descanso/preguntas.

---

## Hora 1 — Fundamentos: Vite, JSX, componentes y props

**Objetivo:** que entiendan qué es un componente y cómo fluye la información con props.

Temas a explicar:
- Qué resuelve Vite (dev server + HMR instantáneo) vs. herramientas más lentas.
- `index.html` → `main.jsx` → `App.jsx`: el punto de entrada de una SPA.
- JSX no es HTML: es azúcar sintáctica sobre `React.createElement`.
- Componentes funcionales como funciones que devuelven JSX.
- Props: datos que fluyen de padre a hijo, de solo lectura.

Archivos guía (constrúyelos en vivo, ya existen como referencia):
- [`src/data/products.js`](./src/data/products.js) — datos "mock", para no depender de un backend.
- [`src/components/StarRating.jsx`](./src/components/StarRating.jsx) — el componente más simple del proyecto: solo recibe `value` y renderiza. Ideal para la primera demo de props.
- [`src/components/ProductCard.jsx`](./src/components/ProductCard.jsx) — muéstralo primero SIN los hooks de carrito/favoritos (solo imagen, nombre, precio) y ve agregando complejidad en las horas siguientes.

Reto en vivo: pedir al grupo que arme un `ProductCard` mínimo que reciba
`producto` por props y muestre nombre + precio, usando `.map()` sobre
`PRODUCTS` para pintar una lista.

---

## Hora 2 — Estado e interactividad: `useState`

**Objetivo:** distinguir props (de afuera) vs. estado (interno, cambia con el tiempo).

Temas a explicar:
- `useState`: qué devuelve (valor + setter), por qué no se debe mutar el estado directamente.
- Manejo de eventos (`onClick`, `onChange`).
- Inputs controlados: el valor del input SIEMPRE viene de React.
- Renderizado condicional (`{lista.length === 0 && ...}`).

Archivos guía:
- [`src/components/SearchBar.jsx`](./src/components/SearchBar.jsx) — input controlado clásico.
- [`src/components/CategoryFilter.jsx`](./src/components/CategoryFilter.jsx) — botones que cambian el estado del padre.
- [`src/pages/Home.jsx`](./src/pages/Home.jsx) — aquí viven los `useState` de `busqueda` y `categoria`, y el filtrado con `.filter()`.

Buen momento para preguntar: *"¿por qué el estado vive en `Home` y no en
`SearchBar`?"* → introduce el concepto de "levantar el estado" (lifting
state up), que sirve de gancho para la Hora 3.

---

## Hora 3 — Efectos y el problema del prop drilling: `useEffect` + Context API

**Objetivo:** entender efectos secundarios y por qué Context resuelve algo que props no puede resolver bien.

Temas a explicar:
- `useEffect`: código que corre *después* del render, para sincronizar con algo externo a React (aquí: `document.title`).
- El arreglo de dependencias: qué pasa con `[]`, sin arreglo, y con valores adentro.
- El problema de "prop drilling": ¿cómo comparten estado un botón dentro de una tarjeta de producto y el contador del navbar, si no son padre-hijo directos?
- Context API como solución: `createContext`, `Provider`, `useContext`.
- Patrón de custom hook para consumir un contexto (`useCart`) en vez de usar `useContext` directo en cada componente.

Archivos guía:
- [`src/pages/Home.jsx`](./src/pages/Home.jsx) línea del `useEffect` que cambia `document.title`.
- [`src/context/CartContext.jsx`](./src/context/CartContext.jsx) — el archivo central de esta hora. Recórranlo función por función: `addItem`, `removeItem`, `updateQuantity`, `clearCart`.
- [`src/components/Navbar.jsx`](./src/components/Navbar.jsx) — consume `useCart()` para mostrar el contador, sin recibir nada por props.

Ejercicio guiado: agregar el `CartProvider` en [`src/App.jsx`](./src/App.jsx)
envolviendo la app, y conectar el botón "Agregar" de `ProductCard` a
`addItem`.

---

## Hora 4 — Persistencia y hooks personalizados

**Objetivo:** que entiendan que un custom hook es solo una función que reutiliza lógica con estado.

Temas a explicar:
- `localStorage`: API del navegador, `getItem`/`setItem`, todo se guarda como string (`JSON.stringify` / `JSON.parse`).
- Cómo construir un custom hook: empieza con `use`, por dentro usa otros hooks.
- `useRef` como "caja" que persiste entre renders sin causar un re-render al cambiar (contraste directo con `useState`).

Archivos guía:
- [`src/hooks/useLocalStorage.js`](./src/hooks/useLocalStorage.js) — constrúyanlo en vivo: empieza como un `useState` normal y va creciendo hasta sincronizar con `localStorage` en un `useEffect`.
- Muestra cómo `CartContext` cambia de `useState([])` a `useLocalStorage('soundgear-carrito', [])` con **una sola línea**.
- [`src/components/QuantityStepper.jsx`](./src/components/QuantityStepper.jsx) — buen ejemplo de componente controlado y reutilizable (se usa en detalle de producto Y en el carrito).

Demo en vivo: agregar productos al carrito, refrescar la página (F5) y
mostrar que el carrito sigue ahí — es el momento "wow" de la hora.

---

## Hora 5 — Librerías útiles: React Router + GSAP + react-hot-toast

**Objetivo:** mostrar el valor de no reinventar la rueda, y cómo se integra una librería externa a un flujo de hooks.

### React Router (~20 min)
- `<BrowserRouter>`, `<Routes>`, `<Route>`, `<Link>` vs. `<a>` (evita recargar la página completa).
- `useParams` para leer `:id` de la URL.
- Archivos: [`src/main.jsx`](./src/main.jsx), [`src/App.jsx`](./src/App.jsx), [`src/pages/ProductPage.jsx`](./src/pages/ProductPage.jsx).

### GSAP (~25 min)
- Por qué a veces no basta con transiciones CSS (control fino de timing, stagger, secuencias).
- Patrón: `useRef` para apuntar al elemento + `useEffect` para animar al montar.
- `gsap.context()` + `.revert()` en el cleanup de `useEffect`: **por qué** (evita animaciones huérfanas si el componente se desmonta, por ejemplo al cambiar de ruta).
- Contraste importante: una animación disparada por un **evento** (clic en "Agregar") no necesita `useEffect`, solo llamas a `gsap.to(...)` dentro del handler.

Archivos guía:
- [`src/hooks/useFadeIn.js`](./src/hooks/useFadeIn.js) — animación de entrada reutilizable.
- [`src/hooks/useStaggerReveal.js`](./src/hooks/useStaggerReveal.js) — animación en cascada para el grid de productos; fíjate cómo el arreglo de dependencias hace que se re-dispare al cambiar el filtro.
- [`src/components/ProductCard.jsx`](./src/components/ProductCard.jsx) y [`src/components/Navbar.jsx`](./src/components/Navbar.jsx) — animaciones disparadas por evento (clic en "Agregar", cambio del contador del carrito).

### react-hot-toast (~5 min)
- Una librería, una línea (`<Toaster />` en `App.jsx` + `toast.success(...)` donde se necesite).
- Buen contraste: "esto lo podrían construir ustedes mismos con Context, pero ya existe una librería que lo resuelve mejor".

---

## Hora 6 — Cierre: favoritos como ejercicio, responsive, buenas prácticas y siguientes pasos

**Objetivo:** consolidar todo lo visto haciéndolos repetir el patrón de la Hora 3 por su cuenta, y cerrar con buenas prácticas.

### Ejercicio guiado (~25 min)
[`src/context/FavoritesContext.jsx`](./src/context/FavoritesContext.jsx) ya
está resuelto en el repo, pero está escrito para que el grupo lo replique
desde cero seleccionando el patrón de `CartContext`:
1. `createContext` + `Provider` con `useLocalStorage`.
2. Función `toggleFavorite(id)`.
3. Custom hook `useFavorites()`.
4. Conectarlo al corazón de `ProductCard` y a una nueva página `/favoritos`.

### Buenas prácticas (~15 min)
- Estructura de carpetas por responsabilidad (`components/`, `pages/`, `context/`, `hooks/`, `data/`, `utils/`).
- Componentes controlados y props claras vs. estado interno innecesario.
- `useMemo` en [`src/pages/Home.jsx`](./src/pages/Home.jsx) y [`src/context/CartContext.jsx`](./src/context/CartContext.jsx): cuándo vale la pena memoizar (y cuándo es prematuro).
- CSS con variables (`src/index.css`) como "mini design system" sin depender de un framework.
- Revisar el diseño responsive del proyecto (`src/App.css`, media queries) en el navegador con las devtools en modo móvil.

### Cierre (~10 min)
- `npm run build` en vivo + mención de cómo desplegarlo (Vercel/Netlify: conectar el repo y listo, detectan Vite automáticamente).
- Retos para practicar después del taller (ver abajo).

---

## Retos extra (para después del taller)

- Agregar un buscador que también filtre por descripción, no solo por nombre.
- Ordenar productos por precio o rating (otro buen caso de uso para `useMemo`).
- Agregar un modo claro/oscuro con una variable CSS y un `useState` + `useEffect` que la sincronice con `localStorage`.
- Migrar `CartContext` de varias funciones sueltas a `useReducer` (buen puente hacia Redux/Zustand más adelante).
- Agregar `useLayoutEffect` en algún lugar y discutir la diferencia con `useEffect`.
- Paginación o "cargar más" en el catálogo.

## Recursos para compartir con el grupo

- [react.dev](https://react.dev/learn) — documentación oficial, con las nuevas guías basadas en hooks.
- [vite.dev](https://vite.dev) — documentación de Vite.
- [reactrouter.com](https://reactrouter.com) — documentación de React Router.
- [gsap.com/docs](https://gsap.com/docs/v3/) — documentación de GSAP.
- [react-hot-toast.com](https://react-hot-toast.com) — documentación de react-hot-toast.
