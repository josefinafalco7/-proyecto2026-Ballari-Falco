import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const SesionContext = createContext(null);

/**
 * Guarda quién inició sesión y se lo ofrece a toda la aplicación.
 * El usuario se conserva en localStorage, igual que en la primera entrega.
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Páginas que pueden usar la sesión.
 * @returns {JSX.Element} El proveedor de la sesión.
 */
export const SesionProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() =>
    JSON.parse(localStorage.getItem('usuarioActual')),
  );

  /**
   * Guarda al usuario como la sesión actual.
   * @param {Object} usuarioLogueado - Usuario que inició sesión.
   * @returns {void} No retorna nada.
   */
  const iniciarSesion = (usuarioLogueado) => {
    localStorage.setItem('usuarioActual', JSON.stringify(usuarioLogueado));
    setUsuario(usuarioLogueado);
  };

  /**
   * Cierra la sesión actual.
   * @returns {void} No retorna nada.
   */
  const cerrarSesion = () => {
    localStorage.removeItem('usuarioActual');
    setUsuario(null);
  };

  return (
    <SesionContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </SesionContext.Provider>
  );
};

SesionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Permite a cualquier componente leer la sesión y modificarla.
 * @returns {{usuario: Object|null, iniciarSesion: Function, cerrarSesion: Function}} La sesión actual.
 */
export const useSesion = () => useContext(SesionContext);
