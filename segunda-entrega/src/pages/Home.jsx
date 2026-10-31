import { useEffect, useState } from 'react';
import { obtenerViajes } from '@api/viajes.js';
import logo from '@assets/logoUCCtransparente.png';
import Card from '@components/Card.jsx';
import {
  formatearFecha,
  formatearPrecio,
  nombreDireccion,
} from '@utils/formatos.js';

/**
 * Página de inicio: presentación del sitio y lista de viajes disponibles,
 * que se piden al servicio simulado cuando la página se carga.
 * @returns {JSX.Element} La página de inicio.
 */
const Home = () => {
  const [viajes, setViajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    /**
     * Pide los viajes al servicio y actualiza el estado según el resultado.
     * @returns {Promise<void>} No retorna nada.
     */
    const cargarViajes = async () => {
      try {
        setViajes(await obtenerViajes());
      } catch {
        setError(
          'No se pudieron cargar los viajes. Verificá que el mock esté corriendo (npm run mock).',
        );
      } finally {
        setCargando(false);
      }
    };

    cargarViajes();
  }, []);

  const hoy = new Date().toISOString().split('T')[0];
  const disponibles = viajes.filter(
    (viaje) => viaje.asientos > 0 && viaje.fecha >= hoy,
  );

  return (
    <>
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
      </section>

      <section className="seccion-contenido" aria-labelledby="titulo-viajes">
        <h2 id="titulo-viajes">Viajes disponibles</h2>

        {cargando && <p role="status">Cargando viajes...</p>}
        {error && (
          <p role="alert" className="mensaje-error">
            {error}
          </p>
        )}
        {!cargando && !error && disponibles.length === 0 && (
          <p className="texto-secundario">Todavía no hay viajes disponibles.</p>
        )}

        <ul className="listado-viajes">
          {disponibles.map((viaje) => (
            <li key={viaje.id}>
              <Card
                titulo={`${viaje.hora} · ${formatearFecha(viaje.fecha)}`}
                subtitulo={nombreDireccion(viaje.direccion)}
              >
                <p>Conductor: {viaje.conductorNombre}</p>
                <p>
                  {viaje.asientos}{' '}
                  {viaje.asientos === 1
                    ? 'asiento disponible'
                    : 'asientos disponibles'}
                </p>
                <p>Punto de encuentro: {viaje.puntoEncuentro}</p>
                <p className="precio">{formatearPrecio(viaje.precio)}</p>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Home;
