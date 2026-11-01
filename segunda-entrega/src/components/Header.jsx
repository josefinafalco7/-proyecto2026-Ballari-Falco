import { Link } from 'react-router-dom';
import Button from '@components/Button.jsx';
import { useSesion } from '@context/SesionContext.jsx';

/**
 * Encabezado del sitio: logo con el nombre de la marca (h1) y, si hay una
 * sesión iniciada, el botón para salir.
 * @returns {JSX.Element} El encabezado.
 */
const Header = () => {
  const { usuario, cerrarSesion } = useSesion();

  return (
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

      {usuario && (
        <div className="acciones-encabezado">
          <Button to="/" variante="fantasma" onClick={cerrarSesion}>
            Salir
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
