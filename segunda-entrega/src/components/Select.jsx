import PropTypes from 'prop-types';

/**
 * Lista desplegable genérica y reutilizable, con su etiqueta.
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.id - Id del select (une la etiqueta con el campo).
 * @param {string} props.etiqueta - Texto de la etiqueta.
 * @param {string} props.valor - Opción elegida.
 * @param {Function} props.onChange - Función que se ejecuta al elegir otra opción.
 * @param {Array<{valor: string, texto: string}>} props.opciones - Opciones disponibles.
 * @returns {JSX.Element} La lista desplegable.
 */
const Select = ({ id, etiqueta, valor, onChange, opciones }) => (
  <div className="campo-formulario">
    <label htmlFor={id}>{etiqueta}</label>
    <select id={id} value={valor} onChange={onChange} required>
      {opciones.map((opcion) => (
        <option key={opcion.valor} value={opcion.valor}>
          {opcion.texto}
        </option>
      ))}
    </select>
  </div>
);

Select.propTypes = {
  id: PropTypes.string.isRequired,
  etiqueta: PropTypes.string.isRequired,
  valor: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  opciones: PropTypes.arrayOf(
    PropTypes.shape({
      valor: PropTypes.string.isRequired,
      texto: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Select;
