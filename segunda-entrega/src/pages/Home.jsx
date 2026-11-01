import { Link } from 'react-router-dom';
import logo from '@assets/logoUCCtransparente.png';
import { useSesion } from '@context/SesionContext.jsx';

/**
 * Página de inicio: presentación del sitio y entrada según el rol elegido.
 * Sin sesión, las tarjetas llevan a la página de acceso. Con sesión iniciada,
 * llevan directo a cada panel.
 * @returns {JSX.Element} La página de inicio.
 */
const Home = () => {
  const { usuario } = useSesion();

  return (
    <section className="seccion-contenido seccion-portada">
      <img src={logo} alt="Logo de UCC Carpool" className="logo-portada" />

      <span className="etiqueta">Universidad Católica de Córdoba</span>

      <h2 className="titulo-portada">
        Compartí el viaje, <em>multiplicá el ahorro</em>
      </h2>

      <p className="subtitulo-portada">
        Viajá entre la Universidad Católica y Nueva Córdoba con otros miembros
        de la comunidad UCC.
      </p>

      <p className="texto-portada">
        El carpooling te permite compartir viajes con otros miembros de la
        universidad, ahorrando tiempo y dinero, y reduciendo el impacto
        ambiental.
      </p>

      <div className="grilla-opciones">
        <Link to={usuario ? '/pasajero' : '/acceso'} className="tarjeta-rol">
          <span className="icono" aria-hidden="true">
            &#128694;
          </span>
          <span className="titulo">Soy Pasajero</span>
        </Link>

        <Link
          to={usuario ? '/conductor' : '/acceso'}
          className="tarjeta-rol tarjeta-rol-destacada"
        >
          <span className="icono" aria-hidden="true">
            &#128663;
          </span>
          <span className="titulo">Soy Conductor</span>
        </Link>
      </div>
    </section>
  );
};

export default Home;
