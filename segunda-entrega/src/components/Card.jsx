import PropTypes from 'prop-types';

/**
 * Tarjeta genérica y reutilizable: título, subtítulo opcional y contenido libre.
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.titulo - Título de la tarjeta.
 * @param {string} [props.subtitulo] - Texto secundario bajo el título.
 * @param {React.ReactNode} props.children - Contenido que va dentro de la tarjeta.
 * @returns {JSX.Element} La tarjeta.
 */
const Card = ({ titulo, subtitulo = '', children }) => (
  <article className="tarjeta">
    <h3 className="tarjeta-titulo">{titulo}</h3>
    {subtitulo && <p className="tarjeta-subtitulo">{subtitulo}</p>}
    <div className="tarjeta-contenido">{children}</div>
  </article>
);

Card.propTypes = {
  titulo: PropTypes.string.isRequired,
  subtitulo: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Card;
