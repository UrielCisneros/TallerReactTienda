// Clases comunes a todos los chips. Las que cambian según si el chip
// está seleccionado se agregan abajo con una plantilla de texto.
const chipBase =
  'rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200';

export function CategoryFilter({ categorias, seleccionada, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categorias.map((categoria) => {
        const activa = categoria === seleccionada;

        return (
          <button
            key={categoria}
            type="button"
            className={`${chipBase} ${
              activa
                ? 'border-primary bg-primary text-white shadow-glow'
                : 'border-border bg-surface text-text-muted hover:border-border-strong hover:bg-surface-hover hover:text-text'
            }`}
            onClick={() => onSelect(categoria)}
          >
            {categoria}
          </button>
        );
      })}
    </div>
  );
}
