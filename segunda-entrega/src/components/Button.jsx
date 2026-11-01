import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Botón genérico y reutilizable. Si recibe "to" se dibuja como link a otra página,
 * y si no, como un botón común.
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Texto o elementos dentro del botón.
 * @param {string} [props.variante] - "primario", "secundario", "fantasma" o "peligro".
 * @param {string} [props.to] - Ruta a la que lleva, si es un link.
 * @param {string} [props.type] - Tipo HTML del botón: "button" o "submit".
 * @param {Function} [props.onClick] - Función que se ejecuta al hacer click.
 * @param {boolean} [props.disabled] - Si está deshabilitado.
 * @param {boolean} [props.completo] - Si ocupa todo el ancho disponible.
 * @param {boolean} [props.chico] - Si usa el tamaño reducido.
 * @param {string} [props.id] - Id HTML del botón.
 * @returns {JSX.Element} El botón o link.
 */
const Button = ({
  children,
  variante = 'primario',
  to,
  type = 'button',
  onClick,
  disabled = false,
  completo = false,
  chico = false,
  id,
}) => {
  const clases = ['boton', `boton-${variante}`];

  if (completo) {
    clases.push('boton-completo');
  }

  if (chico) {
    clases.push('boton-chico');
  }

  if (to) {
    return (
      <Link to={to} className={clases.join(' ')} onClick={onClick} id={id}>
        {children}
      </Link>
    );
  }

  return (
    <button
      id={id}
      type={type}
      className={clases.join(' ')}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variante: PropTypes.oneOf(['primario', 'secundario', 'fantasma', 'peligro']),
  to: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  completo: PropTypes.bool,
  chico: PropTypes.bool,
  id: PropTypes.string,
};

export default Button;
