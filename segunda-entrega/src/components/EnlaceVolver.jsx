import { Link, useNavigate } from 'react-router-dom';

/**
 * Enlace "Volver" de las migas de pan: regresa a la página anterior del historial.
 * @returns {JSX.Element} El enlace.
 */
const EnlaceVolver = () => {
  const navigate = useNavigate();

  /**
   * Evita el cambio de página del link y vuelve atrás en el historial.
   * @param {Event} evento - Evento click del link.
   * @returns {void} No retorna nada.
   */
  const volver = (evento) => {
    evento.preventDefault();
    navigate(-1);
  };

  return (
    <Link to="/" className="enlace-migas" onClick={volver}>
      &larr; Volver
    </Link>
  );
};

export default EnlaceVolver;
