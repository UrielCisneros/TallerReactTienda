import { FiSearch } from 'react-icons/fi';

/**
 * Input controlado: el valor SIEMPRE viene de props (`value`) y cada
 * tecleo avisa al padre con `onChange`. El padre (Home) es quien tiene
 * el useState real — este componente no guarda nada por su cuenta.
 */
export function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <FiSearch />
      <input
        type="text"
        placeholder="Buscar equipo de audio..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
