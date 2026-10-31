import { Link, NavLink } from 'react-router-dom';

/**
 * Encabezado del sitio: logo con el nombre (h1) y menú de navegación.
 * @returns {JSX.Element} El encabezado.
 */
const Header = () => (
  <header className="encabezado">
    <h1 className="marca">
      <Link to="/">
        <img
          src="/faviconUCC.png"
          alt="Logo de UCC Carpool"
          className="logo-header"
        />
        <span className="marca-ucc">UCC</span>
        <span className="marca-carpool">Carpool</span>
      </Link>
    </h1>

    <nav aria-label="Principal" className="menu">
      <NavLink to="/" end className="menu-enlace">
        Inicio
      </NavLink>
    </nav>
  </header>
);

export default Header;
