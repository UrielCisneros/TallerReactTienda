# Guía del taller — React + Vite (6 horas)

Proyecto: **SoundGear**, una mini tienda de equipo de audio (catálogo, detalle
de producto, carrito y favoritos persistidos en `localStorage`). La idea es
que el/la instructor(a) vaya construyendo esto **en vivo**, explicando cada
concepto según se necesita, en vez de mostrar el código ya terminado.

Este repo ya está completo y probado — úsalo como "respuesta" a la que
puedes volver en cualquier momento, o como punto de partida si prefieres
hacer un `git init` y armar el proyecto commit por commit durante el taller.

Ritmo sugerido: 6 bloques de ~50 min + 10 min de descanso/preguntas.

> **Nota sobre el nivel.** El proyecto está escrito a propósito con el mínimo
> de abstracciones: no hay custom hooks, ni `useMemo`, ni `useReducer`, ni
> wrappers alrededor de `useContext`. Todo lo que hace un componente está
> escrito dentro de ese componente, para que el grupo pueda leerlo de arriba
> a abajo sin saltar entre archivos. Si tu grupo avanza rápido, los "Retos
> extra" del final incluyen justamente esas abstracciones.

---

## Hora 1 — Fundamentos: Vite, JSX, componentes y props

**Objetivo:** que entiendan qué es un componente y cómo fluye la información con props.

Temas a explicar:
- Qué resuelve Vite (dev server + HMR instantáneo) vs. herramientas más lentas.
- Tailwind en 2 minutos: las clases del `className` son utilidades de una sola propiedad (`flex`, `gap-4`, `text-primary`). No hace falta explicarlo todo — se va explicando según aparece.
- `index.html` → `main.jsx` → `App.jsx`: el punto de entrada de una SPA.
- JSX no es HTML: es azúcar sintáctica sobre `React.createElement`.
- Componentes funcionales como funciones que devuelven JSX.
- Props: datos que fluyen de padre a hijo, de solo lectura.
- `.map()` para pintar listas, y por qué React pide una `key`.

Archivos guía (constrúyelos en vivo, ya existen como referencia):
- [`src/data/products.js`](./src/data/products.js) — datos "mock", para no depender de un backend.
- [`src/components/StarRating.jsx`](./src/components/StarRating.jsx) — el componente más simple del proyecto: solo recibe `value` y renderiza. Ideal para la primera demo de props.
- [`src/components/ProductCard.jsx`](./src/components/ProductCard.jsx) — muéstralo primero SIN carrito ni favoritos (solo imagen, nombre, precio) y ve agregando complejidad en las horas siguientes.

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
- **Valores derivados**: `productosFiltrados` en `Home` es una variable normal, no un `useState`. Regla simple para el grupo: *si lo puedes calcular a partir del estado, no lo guardes como estado.*

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
- Context API en **3 pasos**, sin nada más:
  1. `createContext()` — crea el canal.
  2. `<CartContext.Provider value={{ ... }}>` — pone datos en el canal.
  3. `useContext(CartContext)` — cualquier hijo, a cualquier profundidad, lee del canal.

Archivos guía:
- [`src/pages/Home.jsx`](./src/pages/Home.jsx) — el `useEffect` que cambia `document.title`.
- [`src/context/CartContext.jsx`](./src/context/CartContext.jsx) — el archivo central de esta hora. Recórranlo función por función: `addItem`, `removeItem`, `updateQuantity`, `clearCart`.
- [`src/components/Navbar.jsx`](./src/components/Navbar.jsx) — llama a `useContext(CartContext)` para mostrar el contador, sin recibir nada por props. Este es el momento "ajá".

Ejercicio guiado: agregar el `CartProvider` en [`src/App.jsx`](./src/App.jsx)
envolviendo la app, y conectar el botón "Agregar" de `ProductCard` a
`addItem`.

Truco de clase: quita temporalmente el `<CartProvider>` de `App.jsx` y muestra
el error que aparece. Sirve para que entiendan que `useContext` solo funciona
**dentro** del Provider.

---

## Hora 4 — Inmutabilidad y persistencia con `localStorage`

**Objetivo:** que entiendan por qué el estado se reemplaza y nunca se muta, y cómo guardar datos entre recargas.

Temas a explicar:
- Actualizar estado sin mutar: `[...items, nuevo]`, `.map()` para modificar uno, `.filter()` para quitar. Recorran `addItem` en `CartContext` con calma — ahí están los tres patrones juntos.
- Por qué `items.push(...)` **no** funciona (React compara referencias; si el arreglo es el mismo, no re-renderiza).
- `localStorage`: API del navegador, `getItem`/`setItem`, todo se guarda como string → `JSON.stringify` / `JSON.parse`.
- Los dos pedazos dentro de `CartProvider`:
  - `useState(() => { ... })` con función inicial → **leer** una sola vez al arrancar.
  - `useEffect(..., [items])` → **guardar** cada vez que cambia.
- `useRef` como "caja" que persiste entre renders sin causar un re-render al cambiar (contraste directo con `useState`). Aquí lo usamos para apuntar a elementos del DOM.

Archivos guía:
- [`src/context/CartContext.jsx`](./src/context/CartContext.jsx) — constrúyanlo en vivo: empieza con `useState([])` a secas y luego agreguen las dos piezas de `localStorage`.
- [`src/components/QuantityStepper.jsx`](./src/components/QuantityStepper.jsx) — componente controlado y reutilizable (se usa en detalle de producto Y en el carrito).

Demo en vivo: agregar productos al carrito, refrescar la página (F5) y
mostrar que el carrito sigue ahí — es el momento "wow" de la hora.
Después abran DevTools → Application → Local Storage y muestren el JSON.

---

## Hora 5 — Librerías útiles: React Router + GSAP + react-hot-toast

**Objetivo:** mostrar el valor de no reinventar la rueda, y cómo se integra una librería externa a un flujo de hooks.

### React Router (~20 min)
- `<BrowserRouter>`, `<Routes>`, `<Route>`, `<Link>` vs. `<a>` (evita recargar la página completa).
- `useParams` para leer `:id` de la URL (llega como **texto**, de ahí el `Number(id)`).
- Ruta comodín `path="*"` para el 404.
- Archivos: [`src/main.jsx`](./src/main.jsx), [`src/App.jsx`](./src/App.jsx), [`src/pages/ProductPage.jsx`](./src/pages/ProductPage.jsx).

### GSAP (~25 min)
- Por qué a veces no basta con transiciones CSS (control fino de timing, stagger, secuencias).
- Arranca mostrando el `Loader`: es la animación más llamativa del proyecto y engancha al grupo antes de entrar a la teoría.
- El patrón son siempre **3 pasos**, escritos dentro del mismo componente:
  1. `const ref = useRef(null)`
  2. `<div ref={ref}>` para conectar el ref al elemento
  3. `useEffect(() => { gsap.fromTo(ref.current, { desde }, { hasta }) }, [])` para animar al montar
- **Usa siempre `fromTo`, no `from`.** `gsap.from(el, { opacity: 0 })` adivina el estado final leyendo el DOM en ese instante. `gsap.fromTo(el, { opacity: 0 }, { opacity: 1 })` lo declara. La diferencia importa por lo que viene abajo.
- Contraste importante: una animación disparada por un **evento** (clic en "Agregar") no necesita `useEffect`, solo llamas a `gsap.fromTo(...)` dentro del handler.
- **La función de cleanup de `useEffect`**: lo que devuelves de un `useEffect` corre cuando el componente desaparece. El proyecto tiene los dos casos clásicos juntos — `.kill()` de una animación infinita en `Loader.jsx` y `clearTimeout` en `App.jsx`. Regla para el grupo: *si tu efecto arranca algo que sigue corriendo solo (una animación infinita, un temporizador, una suscripción), tienes que apagarlo en el cleanup.*

> **Tema de oro para esta hora: `<StrictMode>` y los efectos.**
> React monta cada componente **dos veces** en desarrollo (monta → desmonta →
> remonta) justo para exponer efectos que no son repetibles. Es el mejor
> momento del taller para explicar por qué un `useEffect` debe poder correr
> más de una vez sin romperse.
>
> Demo en vivo: cambia un `fromTo` por `from` en `Home.jsx` y guarda. La
> página se queda casi invisible, porque en el segundo montaje `from` lee la
> opacidad a medio animar (~0.03) y la toma como destino. Vuelve a `fromTo`
> y todo funciona. Es un bug real, visual e inmediato — mucho más efectivo
> que explicar StrictMode en abstracto.
>
> Nota: la alternativa "profesional" es envolver todo en `gsap.context()` y
> llamar a `.revert()` en el cleanup del `useEffect`. Hace lo mismo, pero
> agrega dos conceptos; con `fromTo` el problema simplemente no existe. Si
> el grupo va sobrado de tiempo, menciónalo.

Archivos guía:
- [`src/components/Loader.jsx`](./src/components/Loader.jsx) — la pantalla de carga: un ecualizador de audio de 5 barras. **Empieza por aquí**: es el ejemplo más vistoso de `stagger` (las 5 barras son idénticas, GSAP desfasa cada una solo) y de `repeat: -1` + `yoyo`. Al ser una animación infinita, es también el caso donde el **cleanup** (`.kill()`) se vuelve obligatorio.
- [`src/App.jsx`](./src/App.jsx) — cómo se usa: cada ruta que quiere pantalla de carga envuelve su página en `<Loader ms={...}>`. Inicio usa 1600ms, el detalle de producto 800ms, y carrito/favoritos no lo usan. Todo el estado y el temporizador viven **dentro** del Loader; aquí solo se decide quién lo usa y por cuánto tiempo.

> **Tema de diseño de componentes: `children` y componentes autocontenidos.**
> El `Loader` no le pide nada a quien lo usa más que un número. Guarda su
> propio `useState`, su propio `setTimeout`, y cuando termina renderiza sus
> `children`. Es el mismo patrón que ya vieron en `CartProvider`: un
> componente que envuelve a otros y decide qué hacer con ellos.
>
> Ejercicio de 2 minutos: cambiar `ms={1600}` por `ms={5000}` y ver que no
> hay que tocar nada más. Y como `ms` tiene valor por defecto, `<Loader>`
> a secas también funciona.
>
> Pregunta para el grupo: *¿por qué el Loader envuelve a la página en vez
> de ponerse al lado?* Porque así la página **no se monta** hasta que
> termina la carga, y sus animaciones de entrada (el hero, el stagger del
> grid) se reproducen justo cuando el usuario empieza a ver la pantalla,
> no detrás del ecualizador.
>
> **Y por eso el `<Loader>` va por fuera de la página, en la ruta, y no
> dentro del archivo de la página.** Es un error muy fácil de cometer y
> vale la pena mostrarlo en vivo: si mueves el `<Loader>` dentro de
> `Home.jsx`, el `useEffect` del hero corre cuando monta `Home` — pero
> el `<section ref={heroRef}>` todavía no existe, porque los children del
> Loader no se renderizan durante la carga. `heroRef.current` es `null` y
> el hero se queda sin animación. Regla general: **un `ref` solo existe
> cuando el elemento está montado en pantalla.**
- [`src/pages/Home.jsx`](./src/pages/Home.jsx) — el fade-in del hero: el ejemplo más limpio del patrón `useRef` + `useEffect` + `fromTo`.
- [`src/components/ProductGrid.jsx`](./src/components/ProductGrid.jsx) — animación en cascada (`stagger`); fíjate cómo el arreglo de dependencias `[productos]` hace que se re-dispare al cambiar el filtro. Es el mejor ejemplo vivo de "para qué sirven las dependencias de `useEffect`".
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
desde cero copiando el patrón de `CartContext`:
1. `createContext()` + `Provider`, con `useState` + los dos pedazos de `localStorage`.
2. Función `toggleFavorite(id)` — ojo: aquí solo guardamos **ids**, no el producto completo.
3. Conectarlo al corazón de `ProductCard` con `useContext(FavoritesContext)`.
4. Crear la página `/favoritos`, que filtra `PRODUCTS` con los ids guardados.

### Buenas prácticas (~15 min)
- Estructura de carpetas por responsabilidad (`components/`, `pages/`, `context/`, `data/`, `utils/`).
- Componentes controlados y props claras vs. estado interno innecesario.
- Valores derivados en vez de estado duplicado (`productosFiltrados`, `totalItems`, `totalPrecio`).
- Tailwind CSS v4: utilidades en el `className` en vez de archivos CSS por componente. Mostrar que no hay `tailwind.config.js` — todo se configura desde `src/index.css`.
- El bloque `@theme` de [`src/index.css`](./src/index.css) como "mini design system": cambiar `--color-primary` y ver cómo se actualiza toda la app. Es la mejor demo de por qué existen los tokens.
- Revisar el diseño responsive en el navegador con las devtools en modo móvil, y mostrar los prefijos de Tailwind (`sm:px-6`, `min-[780px]:grid-cols-...`).
- Cuándo extraer: si una cadena de clases se repite mucho, se guarda en una constante (`linkBase` en `Navbar.jsx`, `btnClases` en `QuantityStepper.jsx`) o se hace un componente.

### Cierre (~10 min)
- `pnpm build` en vivo + mención de cómo desplegarlo (Vercel/Netlify: conectar el repo y listo, detectan Vite automáticamente).
- Retos para practicar después del taller (ver abajo).

---

## Retos extra (para después del taller)

Los primeros son de práctica directa; los últimos introducen las abstracciones
que a propósito **no** usamos en el proyecto, y son el siguiente escalón natural.

- Hacer que el `Loader` aparezca también al cambiar de página, no solo al abrir la app.
- Agregar un buscador que también filtre por descripción, no solo por nombre.
- Ordenar productos por precio o rating con un `<select>` y otro `useState`.
- Agregar un modo claro/oscuro con una variable CSS y un `useState` + `useEffect` que lo sincronice con `localStorage`.
- Paginación o "cargar más" en el catálogo.
- **Custom hooks**: notar que `CartContext` y `FavoritesContext` repiten el mismo código de `localStorage`, y extraerlo a un `useLocalStorage(key, valorInicial)`. Es el mejor ejemplo de por qué existen los custom hooks: primero duplicas, después abstraes.
- **`useMemo`**: medir si el filtrado de `Home` realmente cuesta algo, y discutir cuándo memoizar vale la pena (y cuándo es optimización prematura).
- **`useReducer`**: migrar `CartContext` de varias funciones sueltas a un reducer (buen puente hacia Redux/Zustand más adelante).

## Recursos para compartir con el grupo

- [react.dev](https://react.dev/learn) — documentación oficial, con las nuevas guías basadas en hooks.
- [vite.dev](https://vite.dev) — documentación de Vite.
- [reactrouter.com](https://reactrouter.com) — documentación de React Router.
- [gsap.com/docs](https://gsap.com/docs/v3/) — documentación de GSAP.
- [react-hot-toast.com](https://react-hot-toast.com) — documentación de react-hot-toast.
