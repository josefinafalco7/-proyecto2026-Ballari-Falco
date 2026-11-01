import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ERROR_SERVIDOR } from '@api/config.js';
import { obtenerViajes } from '@api/viajes.js';
import Button from '@components/Button.jsx';
import Card from '@components/Card.jsx';
import PanelReservas from '@components/PanelReservas.jsx';
import { useSesion } from '@context/SesionContext.jsx';
import NotFound from '@pages/NotFound.jsx';
import {
  formatearFecha,
  formatearPrecio,
  nombreDireccion,
  textoAsientosDisponibles,
} from '@utils/formatos.js';
import { fechaDeHoy } from '@utils/validaciones.js';

const DIRECCIONES_VALIDAS = ['ucc-nc', 'nc-ucc'];

/**
 * Página con los viajes disponibles en una dirección (UCC → Nueva Córdoba o al revés).
 * Muestra solo los viajes con asientos libres, que no hayan pasado y que no sean
 * del propio usuario, y calcula el total de asientos libres.
 * @returns {JSX.Element} La página de viajes del pasajero.
 */
const ViajesPasajero = () => {
  const { direccion } = useParams();
  const { usuario } = useSesion();
  const [version, setVersion] = useState(0);
  const [viajes, setViajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let activo = true;

    /**
     * Pide los viajes publicados al servicio simulado.
     * @returns {Promise<void>} No retorna nada.
     */
    const cargarViajes = async () => {
      try {
        const datos = await obtenerViajes();

        if (activo) {
          setViajes(datos);
          setError('');
        }
      } catch {
        if (activo) {
          setError(ERROR_SERVIDOR);
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    cargarViajes();

    return () => {
      activo = false;
    };
  }, [version]);

  if (!DIRECCIONES_VALIDAS.includes(direccion)) {
    return <NotFound />;
  }

  const hoy = fechaDeHoy();
  const disponibles = viajes.filter(
    (viaje) =>
      viaje.direccion === direccion &&
      viaje.asientos > 0 &&
      viaje.fecha >= hoy &&
      viaje.conductorId !== usuario.id,
  );
  const totalAsientos = disponibles.reduce(
    (suma, viaje) => suma + viaje.asientos,
    0,
  );

  return (
    <>
      <p className="migas-de-pan">
        <Link to="/pasajero" className="enlace-migas">
          &larr; Cambiar dirección
        </Link>
      </p>

      <section className="seccion-contenido">
        <h2>Viajes disponibles</h2>
        <p className="etiqueta-ruta">{nombreDireccion(direccion)}</p>

        {cargando && (
          <p role="status" className="texto-secundario">
            Cargando viajes...
          </p>
        )}
        {error && (
          <p role="alert" className="mensaje-error">
            {error}
          </p>
        )}

        {!cargando && !error && (
          <>
            <p className="texto-secundario">
              {`${disponibles.length} ${disponibles.length === 1 ? 'viaje encontrado' : 'viajes encontrados'}`}
            </p>
            <p className="texto-secundario">
              {`${totalAsientos} ${totalAsientos === 1 ? 'asiento libre en total' : 'asientos libres en total'}`}
            </p>

            <ul className="listado-viajes">
              {disponibles.map((viaje) => (
                <li key={viaje.id}>
                  <Card
                    titulo={`${viaje.hora} · ${formatearFecha(viaje.fecha)}`}
                    clase="recuadro-viaje"
                  >
                    <p>{`Conductor: ${viaje.conductorNombre}`}</p>
                    <p>
                      {`${textoAsientosDisponibles(viaje.asientos)} · Punto de encuentro: ${viaje.puntoEncuentro}`}
                    </p>
                    <p>{`Precio: ${formatearPrecio(viaje.precio)} por asiento`}</p>
                    <Button
                      to={`/pasajero/viaje/${viaje.id}`}
                      variante="secundario"
                    >
                      Ver detalle →
                    </Button>
                  </Card>
                </li>
              ))}
            </ul>

            {disponibles.length === 0 && (
              <p className="mensaje-vacio">
                No hay viajes disponibles en este horario todavía.
              </p>
            )}
          </>
        )}
      </section>

      <PanelReservas
        usuarioId={usuario.id}
        version={version}
        onCambio={() => setVersion((anterior) => anterior + 1)}
      />
    </>
  );
};

export default ViajesPasajero;
