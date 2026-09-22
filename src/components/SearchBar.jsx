import { FiSearch } from 'react-icons/fi';

/**
 * Input controlado: el valor SIEMPRE viene de props (`value`) y cada
 * tecleo avisa al padre con `onChange`. El padre (Home) es quien tiene
 * el useState real — este componente no guarda nada por su cuenta.
 *
 * focus-within: aplica estilos al contenedor cuando el foco está en
 * CUALQUIER elemento de adentro (aquí, el input).
 */
export function SearchBar({ value, onChange }) {
  return (
    <div className="flex items-center gap-3 rounded-sm border border-border bg-bg/60 px-4 py-3 text-text-muted transition-colors focus-within:border-primary">
      <FiSearch className="size-4 shrink-0" />
      <input
        type="text"
        placeholder="Buscar equipo de audio..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-0 bg-transparent text-sm text-text placeholder:text-text-muted/70 focus:outline-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="shrink-0 text-xs font-medium text-text-muted transition-colors hover:text-text"
        >
          Limpiar
        </button>
      )}
    </div>
  );
}
