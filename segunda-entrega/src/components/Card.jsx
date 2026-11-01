import PropTypes from 'prop-types';

/**
 * Tarjeta genérica y reutilizable: un recuadro con título (legend) y contenido libre.
 * Se usa para las direcciones, los viajes y los grupos de campos de los formularios.
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.titulo - Título del recuadro.
 * @param {string} props.clase - Clase de estilo: "recuadro-direccion", "recuadro-viaje" o "grupo-formulario".
 * @param {React.ReactNode} props.children - Contenido del recuadro.
 * @returns {JSX.Element} La tarjeta.
 */
const Card = ({ titulo, clase, children }) => (
  <fieldset className={clase}>
    <legend>{titulo}</legend>
    {children}
  </fieldset>
);

Card.propTypes = {
  titulo: PropTypes.string.isRequired,
  clase: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Card;
