import { FaStar, FaRegStar } from 'react-icons/fa';

/**
 * Componente 100% "de props": no tiene estado propio, solo recibe datos
 * y devuelve JSX. Es el primer componente ideal para explicar props en
 * la Hora 1, antes de tocar useState.
 */
export function StarRating({ value }) {
  const estrellas = Array.from({ length: 5 }, (_, i) => i < Math.round(value));

  return (
    <div className="star-rating" aria-label={`${value} de 5 estrellas`}>
      {estrellas.map((llena, i) =>
        llena ? <FaStar key={i} /> : <FaRegStar key={i} />
      )}
      <span className="star-rating-value">{value.toFixed(1)}</span>
    </div>
  );
}
