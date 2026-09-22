import { FiMinus, FiPlus } from 'react-icons/fi';

const btnClases =
  'flex size-8 items-center justify-center rounded-sm border-0 bg-surface-hover text-text transition hover:bg-border-strong active:scale-90 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-surface-hover';

/**
 * Componente controlado y reutilizable: no guarda su propio estado,
 * recibe `value` y avisa los cambios con `onChange` (patrón idéntico
 * al de un <input>). Se usa tanto en el detalle de producto como en
 * el carrito, mostrando cómo un mismo componente sirve en dos pantallas.
 */
export function QuantityStepper({ value, onChange, min = 1, max = 99 }) {
  function decrementar() {
    if (value > min) onChange(value - 1);
  }

  function incrementar() {
    if (value < max) onChange(value + 1);
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-sm border border-border bg-surface p-1">
      <button
        type="button"
        className={btnClases}
        onClick={decrementar}
        disabled={value <= min}
        aria-label="Disminuir cantidad"
      >
        <FiMinus className="size-3.5" />
      </button>
      <span className="min-w-8 text-center text-sm font-semibold tabular-nums">
        {value}
      </span>
      <button
        type="button"
        className={btnClases}
        onClick={incrementar}
        disabled={value >= max}
        aria-label="Aumentar cantidad"
      >
        <FiPlus className="size-3.5" />
      </button>
    </div>
  );
}
