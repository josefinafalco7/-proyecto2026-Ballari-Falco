import { Link } from 'react-router-dom';

/**
 * Encabezado del sitio: logo con el nombre de la marca (h1).
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
  </header>
);

export default Header;
