import PropTypes from 'prop-types';

/**
 * Botón genérico y reutilizable. El texto se pasa como contenido (children).
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Texto o elementos dentro del botón.
 * @param {string} [props.variante] - "primario", "secundario" o "peligro".
 * @param {string} [props.type] - Tipo HTML del botón: "button" o "submit".
 * @param {Function} [props.onClick] - Función que se ejecuta al hacer click.
 * @param {boolean} [props.disabled] - Si está deshabilitado.
 * @returns {JSX.Element} El botón.
 */
const Button = ({
  children,
  variante = 'primario',
  type = 'button',
  onClick,
  disabled = false,
}) => (
  <button
    type={type}
    className={`boton boton-${variante}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variante: PropTypes.oneOf(['primario', 'secundario', 'peligro']),
  type: PropTypes.oneOf(['button', 'submit']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
