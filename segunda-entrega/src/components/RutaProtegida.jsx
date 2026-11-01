import { useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSesion } from '@context/SesionContext.jsx';

/**
 * Protege un grupo de rutas: si no hay sesión iniciada avisa y lleva a la página de acceso;
 * y si se indican roles y la cuenta no corresponde, avisa y la lleva a otra página.
 * Cuando todo está bien, dibuja la página de la ruta hija (Outlet).
 * @param {Object} props - Propiedades del componente.
 * @param {Array<string>} [props.roles] - Tipos de cuenta permitidos. Si no se indica, alcanza con tener sesión.
 * @param {string} [props.mensajeRol] - Aviso para quien no tiene el tipo de cuenta permitido.
 * @param {string} [props.destinoRol] - Ruta a la que se lleva a quien no tiene el tipo de cuenta permitido.
 * @returns {JSX.Element|null} La página de la ruta hija, o nada si no corresponde mostrarla.
 */
const RutaProtegida = ({ roles, mensajeRol, destinoRol }) => {
  const { usuario } = useSesion();
  const navigate = useNavigate();
  const yaAvisado = useRef(false);

  const sinSesion = !usuario;
  const sinRol = Boolean(
    usuario && roles && !roles.includes(usuario.tipoCuenta),
  );

  useEffect(() => {
    if (yaAvisado.current) {
      return;
    }

    if (sinSesion) {
      yaAvisado.current = true;
      alert('Tenés que iniciar sesión primero.');
      navigate('/acceso', { replace: true });
    } else if (sinRol) {
      yaAvisado.current = true;
      alert(mensajeRol);
      navigate(destinoRol, { replace: true });
    }
  }, [sinSesion, sinRol, mensajeRol, destinoRol, navigate]);

  if (sinSesion || sinRol) {
    return null;
  }

  return <Outlet />;
};

RutaProtegida.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string),
  mensajeRol: PropTypes.string,
  destinoRol: PropTypes.string,
};

export default RutaProtegida;
