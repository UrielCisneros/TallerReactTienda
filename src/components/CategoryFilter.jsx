export function CategoryFilter({ categorias, seleccionada, onSelect }) {
  return (
    <div className="category-filter">
      {categorias.map((categoria) => (
        <button
          key={categoria}
          type="button"
          className={`chip ${categoria === seleccionada ? 'chip-active' : ''}`}
          onClick={() => onSelect(categoria)}
        >
          {categoria}
        </button>
      ))}
    </div>
  );
}
