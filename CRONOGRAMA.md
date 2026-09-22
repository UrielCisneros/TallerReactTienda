# Cronograma del taller — 6 horas

Compañero de [`GUIA_TALLER.md`](./GUIA_TALLER.md): la guía explica **qué**
enseñar y con qué profundidad; este documento dice **cuándo** y **qué debe
estar en pantalla al terminar cada hora**.

Formato de cada bloque: **50 min de trabajo + 10 min de descanso/preguntas**.
Todo se construye en vivo, partiendo del cascarón de este repo.

---

## Antes del taller

**Unos días antes**, manda al grupo estas instrucciones y pide que confirmen
que les funcionó. Es la diferencia entre empezar a los 5 minutos o a los 40:

1. Instalar [Node.js 20+](https://nodejs.org) y pnpm (`npm install -g pnpm`).
2. Clonar el repo en la rama `feature/cascaron` y correr `pnpm i` **con internet, desde su casa**.
3. Verificar con `pnpm dev` que abre la pantalla de bienvenida.
4. Instalar VS Code + la extensión Tailwind CSS IntelliSense.

**El día del taller, antes de empezar:**

- Ramas del repo: **`feature/cascaron`** es lo que descarga el grupo,
  **`feature/planificacion`** tiene el proyecto terminado. Si vas tarde,
  rescata archivos de la rama solución sin escribirlos a mano:
  ```bash
  git checkout feature/planificacion -- src/components/ProductCard.jsx
  ```
- Ten la app terminada corriendo en una segunda ventana (`pnpm dev` en otro
  puerto) para mostrar el destino y para comparar.
- Sube el tamaño de fuente del editor y de la terminal. Tema oscuro.
- Ten abierto un `localStorage.clear()` a la mano en la consola del navegador.

**Regla de oro del ritmo:** si a los 10 minutos del final de una hora el
checkpoint no está, rescata los archivos de la rama solución, explícalos leyéndolos
y sigue. Nunca arrastres el retraso a la hora siguiente.

---

## Hora 1 — Fundamentos: JSX, componentes, props y listas

**Punto de partida:** el cascarón tal cual se descarga.

| Min | Qué haces |
|-----|-----------|
| 0–10 | Bienvenida. **Muestra la app terminada corriendo** y navega por ella: catálogo, detalle, carrito, favoritos. Ese es el destino. |
| 10–20 | Recorrido del cascarón: `index.html` → `main.jsx` → `App.jsx`. Qué resuelve Vite. Edita un texto de `App.jsx` y guarda: HMR instantáneo. Tailwind en 2 minutos (clases de una sola propiedad). |
| 20–32 | Primer componente en vivo: `StarRating.jsx`. Solo recibe `value` y pinta estrellas. Es la demo más limpia de props. |
| 32–50 | Abre `src/data/products.js`. `ProductCard.jsx` **mínimo** (imagen, nombre, precio, `<StarRating>`) y `Home.jsx` que hace `.map()` sobre `PRODUCTS`. Explica la `key` aquí, no antes. |

**Se enseña:** qué es un componente · JSX no es HTML (azúcar sobre
`createElement`) · props de solo lectura, de padre a hijo · `.map()` para
listas y por qué React pide `key` · composición.

**Checkpoint (al minuto 50 debe existir):**
- `src/components/StarRating.jsx`, `src/components/ProductCard.jsx`, `src/pages/Home.jsx`
- En pantalla: los 20 productos con imagen, nombre, precio y estrellas.
- Sin estado, sin eventos, sin rutas. Todavía nada es interactivo.

> Si sobra tiempo: `Navbar.jsx` y `Footer.jsx` estáticos (componentes sin
> props). Si no, déjalos para el arranque de la Hora 2 — el contador del
> Navbar no se necesita hasta la Hora 3.

---

## Hora 2 — Estado e interactividad: `useState`

**Punto de partida:** catálogo estático pintado.

| Min | Qué haces |
|-----|-----------|
| 0–5 | Repaso relámpago: props = lo que viene de afuera. Pregunta: *¿cómo cambio algo cuando el usuario hace clic?* |
| 5–12 | Contador desechable (`useState(0)` + `onClick`) en un componente de prueba. Muestra que cambiar una variable normal **no** repinta. Bórralo al terminar. |
| 12–28 | `SearchBar.jsx`: input controlado. El `useState` de `busqueda` vive en `Home` y baja por props junto con el setter. Aquí sale solo el tema de **levantar el estado**. |
| 28–40 | `CategoryFilter.jsx`: botones que cambian `categoria` en el padre. Estilo condicional del botón activo. |
| 40–50 | Filtrado: `productosFiltrados` como **variable normal**, no `useState`. Renderizado condicional del mensaje "no se encontraron productos". |

**Se enseña:** `useState` (valor + setter, nunca mutar) · eventos `onClick` /
`onChange` · inputs controlados · renderizado condicional (`&&`) · **valores
derivados**: *si lo puedes calcular a partir del estado, no lo guardes como
estado* · levantar el estado al ancestro común.

**Checkpoint:**
- Escribir en el buscador filtra el grid en tiempo real.
- Los botones de categoría filtran y se ven activos.
- Buscar algo inexistente muestra el mensaje vacío.
- `Home` tiene exactamente dos `useState`. Si alguien creó un tercero para los
  resultados filtrados, ese es el momento de corregirlo en vivo.

---

## Hora 3 — `useEffect` y Context API

**Punto de partida:** catálogo con búsqueda y filtros.

| Min | Qué haces |
|-----|-----------|
| 0–12 | `useEffect` en `Home` cambiando `document.title`. Los tres casos del arreglo de dependencias: `[]`, sin arreglo, y con valores adentro. Muéstralos en vivo con un `console.log`. |
| 12–20 | **El problema.** Dibuja el árbol de componentes en el pizarrón: el botón "Agregar" vive en `ProductCard`, el contador en `Navbar`. No son padre e hijo. ¿Cuántos componentes tendrían que pasar props? Eso es *prop drilling*. |
| 20–38 | `CartContext.jsx` en 3 pasos: `createContext()` → `<CartContext.Provider value={{...}}>` con `useState([])` y `addItem` → `useContext` en `Navbar` para el contador. Envuelve la app con `<CartProvider>` en `App.jsx`. |
| 38–47 | Conecta el botón "Agregar" de `ProductCard` con `useContext(CartContext)`. **Momento "ajá":** el contador sube sin que nadie haya pasado una sola prop. |
| 47–50 | Truco: quita el `<CartProvider>` de `App.jsx` y muestra el error. `useContext` solo funciona **dentro** del Provider. |

**Se enseña:** `useEffect` como sincronización con algo externo a React · el
arreglo de dependencias · prop drilling · Context en 3 pasos · un Provider es
un componente que recibe `children`.

**Checkpoint:**
- `src/context/CartContext.jsx` existe con `items` y `addItem`.
- Clic en "Agregar" → sube el contador del Navbar.
- Todavía **no** hay persistencia ni página de carrito.

> Para `addItem` ya necesitas inmutabilidad. Aquí basta con el mínimo
> (`setItems([...items, nuevo])`) y una frase: *"el estado se reemplaza, no se
> modifica; mañana... digo, la próxima hora vemos por qué"*. El desarrollo
> completo es la Hora 4.

---

## Hora 4 — Inmutabilidad y persistencia

**Punto de partida:** se puede agregar al carrito, pero no se ve ni sobrevive.

| Min | Qué haces |
|-----|-----------|
| 0–15 | Inmutabilidad a fondo. Muestra en vivo que `items.push(...)` **no** repinta: React compara referencias. Los tres patrones juntos: `[...items, nuevo]` para agregar, `.map()` para modificar uno, `.filter()` para quitar. Completa `addItem` (caso "ya existe"), `removeItem`, `updateQuantity`, `clearCart`. |
| 15–28 | `localStorage`: API del navegador, todo es string → `JSON.stringify` / `JSON.parse`. Las dos piezas dentro de `CartProvider`: `useState(() => ...)` para **leer** una vez al arrancar, y `useEffect(..., [items])` para **guardar** en cada cambio. |
| 28–33 | **Momento "wow":** agrega productos, F5, el carrito sigue ahí. Abre DevTools → Application → Local Storage y muestra el JSON. |
| 33–47 | `QuantityStepper.jsx` (controlado y reutilizable) y `CartPage.jsx`: lista de items, subtotales, botón vaciar. |
| 47–50 | `totalItems` y `totalPrecio` calculados en el Provider, **no** guardados en estado. Segundo ejemplo de valor derivado. |

**Se enseña:** por qué el estado se reemplaza y nunca se muta · los tres
patrones inmutables · `localStorage` y serialización JSON · inicialización
perezosa de `useState` · un componente controlado que se usa en dos lugares.

**Checkpoint:**
- Carrito completo: agregar, cambiar cantidades, eliminar, vaciar, totales.
- Sobrevive a F5.
- `CartPage` se ve en pantalla.

> **Nota de orden.** `CartPage` todavía no tiene URL propia: móntala temporalmente
> en `App.jsx` debajo de `<Home />`. Es intencional y se aprovecha en la Hora 5
> ("esto se ve mal, y el botón Atrás no hace nada → para eso existe un router").
> Si prefieres evitar el paso intermedio, mueve los primeros 15 minutos de la
> Hora 5 (React Router) al inicio de esta hora y recorta la demo de DevTools.

---

## Hora 5 — Librerías: React Router, GSAP y react-hot-toast

**Punto de partida:** catálogo y carrito funcionando, todo en una sola pantalla.

| Min | Qué haces |
|-----|-----------|
| 0–15 | **React Router.** `<BrowserRouter>` ya está puesto en `main.jsx`. Declara `<Routes>` en `App.jsx`: `/`, `/producto/:id`, `/carrito`, y `*` para el 404. `<Link>` vs `<a>` (uno no recarga la página). `ProductPage.jsx` con `useParams` — el `id` llega como **texto**, de ahí el `Number(id)`. |
| 15–25 | **GSAP, empezando por lo vistoso:** `Loader.jsx`, el ecualizador de 5 barras. `stagger` (barras idénticas, GSAP las desfasa), `repeat: -1` + `yoyo`, y el **cleanup** con `.kill()`, que aquí es obligatorio porque la animación es infinita. |
| 25–35 | El patrón de 3 pasos en `Home`: `useRef(null)` → `ref={heroRef}` → `useEffect` con `gsap.fromTo(...)`. Luego `ProductGrid.jsx` con `stagger` y dependencias `[productos]`: al cambiar el filtro la animación se re-dispara. Es el mejor ejemplo vivo de para qué sirve el arreglo de dependencias. |
| 35–40 | **Tema de oro: StrictMode.** Cambia un `fromTo` por `from` en `Home` y guarda: la página se queda casi invisible. React monta dos veces en desarrollo, y `from` adivina el destino leyendo el DOM a medio animar. Vuelve a `fromTo`. Bug real, visual, en 30 segundos. |
| 40–45 | Animación disparada por **evento** (clic en "Agregar" en `ProductCard`): no necesita `useEffect`, solo llamas a `gsap.fromTo` dentro del handler. |
| 45–50 | **react-hot-toast:** `<Toaster />` en `App.jsx` + `toast.success(...)`. Una librería, una línea. |

**Se enseña:** enrutado de una SPA · `useParams` · `useRef` como puntero al
DOM · el patrón ref + efecto + animación · `fromTo` vs `from` y por qué
StrictMode monta dos veces · cleanup de `useEffect` (*si tu efecto arranca
algo que sigue corriendo solo, apágalo*) · `children` y componentes
autocontenidos (el `Loader` envuelve a la página, no vive dentro de ella).

**Checkpoint:**
- Cuatro rutas navegables con URL real y botón Atrás funcionando.
- Pantalla de carga al abrir la app.
- Hero y grid con animación de entrada.
- Toast al agregar al carrito.

---

## Hora 6 — Favoritos por su cuenta, buenas prácticas y cierre

**Punto de partida:** la app completa salvo favoritos.

| Min | Qué haces |
|-----|-----------|
| 0–5 | Plantea el ejercicio: repetir el patrón de `CartContext`, pero guardando **solo ids**, no el producto completo. Escribe los 4 pasos en el pizarrón. |
| 5–25 | **Trabajan solos.** Tú circulas. Los 4 pasos: (1) `createContext` + Provider con `useState` y las dos piezas de `localStorage`; (2) `toggleFavorite(id)` e `isFavorite(id)`; (3) conectar el corazón de `ProductCard`; (4) página `/favoritos` que filtra `PRODUCTS` con los ids guardados. |
| 25–35 | Resuélvelo en vivo y compara con lo que hicieron. Pregunta abierta: *¿por qué aquí guardamos ids y en el carrito objetos completos?* |
| 35–48 | **Buenas prácticas:** estructura por responsabilidad · valores derivados vs. estado duplicado · cuándo extraer un componente o una constante de clases · responsive con las devtools en modo móvil y los prefijos `sm:` / `min-[780px]:` · **la demo estrella:** cambia `--color-primary` en `src/index.css` y toda la app cambia de color. Ahí se entiende para qué existen los tokens. |
| 48–60 | `pnpm build` en vivo, despliegue en Vercel/Netlify (conectar el repo y listo), retos extra y recursos. Preguntas finales. |

**Se enseña:** consolidación del patrón de Context por repetición ·
decisiones de modelado de datos (ids vs. objetos) · design tokens ·
responsive con utilidades · build y despliegue.

**Checkpoint final:** la app completa, igual a la de referencia, construida
por ellos.

---

## Si vas atrasado: qué se puede recortar

En orden, de lo más prescindible a lo que no deberías tocar:

1. El contador desechable de la Hora 2 (5 min).
2. `Navbar` y `Footer` estáticos: rescátalos de la rama solución (5 min).
3. El 404 y `ProductPage` de la Hora 5: con `/` y `/carrito` el router ya se
   entiende (8 min).
4. La animación por evento de `ProductCard` (5 min).
5. El ejercicio de favoritos: pásalo a "reto para casa" y usa esos 20 minutos
   para terminar bien la Hora 5 (20 min).

**No recortes nunca:** el contador del Navbar con Context (Hora 3), la demo de
F5 con `localStorage` (Hora 4) y la demo de `from` vs `fromTo` (Hora 5). Son
los tres momentos donde el concepto se vuelve obvio en pantalla.
