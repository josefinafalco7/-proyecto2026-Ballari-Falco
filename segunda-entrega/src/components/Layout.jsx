import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from '@components/Footer.jsx';
import Header from '@components/Header.jsx';

/**
 * Estructura común a todas las páginas: encabezado, contenido y pie.
 * El contenido cambia según la ruta hija activa, y se dibuja en el Outlet.
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} [props.conLateral] - Si la página lleva el panel lateral de reservas.
 * @returns {JSX.Element} El layout.
 */
const Layout = ({ conLateral = false }) => (
  <>
    <Header />
    <main
      className={
        conLateral
          ? 'contenido-principal pagina-con-lateral'
          : 'contenido-principal'
      }
    >
      <Outlet />
    </main>
    <Footer />
  </>
);

Layout.propTypes = {
  conLateral: PropTypes.bool,
};

export default Layout;
