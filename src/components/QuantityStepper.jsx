import { FiMinus, FiPlus } from 'react-icons/fi';

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
    <div className="quantity-stepper">
      <button
        type="button"
        className="quantity-btn"
        onClick={decrementar}
        disabled={value <= min}
        aria-label="Disminuir cantidad"
      >
        <FiMinus />
      </button>
      <span className="quantity-value">{value}</span>
      <button
        type="button"
        className="quantity-btn"
        onClick={incrementar}
        disabled={value >= max}
        aria-label="Aumentar cantidad"
      >
        <FiPlus />
      </button>
    </div>
  );
}
