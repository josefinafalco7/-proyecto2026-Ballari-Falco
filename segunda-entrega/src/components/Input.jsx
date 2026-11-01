import PropTypes from 'prop-types';

/**
 * Campo de formulario genérico y reutilizable: etiqueta, input y mensaje de error accesible.
 * El error se anuncia con role="alert" y queda asociado al input con aria-describedby.
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.id - Id del input (une la etiqueta con el campo).
 * @param {string} props.etiqueta - Texto de la etiqueta.
 * @param {string} props.valor - Valor actual del campo.
 * @param {Function} props.onChange - Función que se ejecuta al escribir.
 * @param {string} [props.error] - Mensaje de error a mostrar.
 * @param {string} [props.tipo] - Tipo de input: text, email, password, number, date o time.
 * @returns {JSX.Element} El campo.
 */
const Input = ({
  id,
  etiqueta,
  valor,
  onChange,
  error = '',
  tipo = 'text',
  ...resto
}) => (
  <div className="campo-formulario">
    <label htmlFor={id}>{etiqueta}</label>
    <input
      id={id}
      type={tipo}
      value={valor}
      onChange={onChange}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      {...resto}
    />
    {error && (
      <p id={`${id}-error`} role="alert" className="error-campo">
        {error}
      </p>
    )}
  </div>
);

Input.propTypes = {
  id: PropTypes.string.isRequired,
  etiqueta: PropTypes.string.isRequired,
  valor: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  tipo: PropTypes.string,
};

export default Input;
