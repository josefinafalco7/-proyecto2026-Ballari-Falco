import { Outlet } from 'react-router-dom';
import Footer from '@components/Footer.jsx';
import Header from '@components/Header.jsx';

/**
 * Estructura común a todas las páginas: encabezado, contenido y pie.
 * El contenido cambia según la ruta hija activa, y se dibuja en el Outlet.
 * @returns {JSX.Element} El layout.
 */
const Layout = () => (
  <>
    <Header />
    <main className="contenido-principal">
      <Outlet />
    </main>
    <Footer />
  </>
);

export default Layout;
