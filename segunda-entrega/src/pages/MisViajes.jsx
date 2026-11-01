import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ERROR_SERVIDOR } from '@api/config.js';
import { obtenerReservas } from '@api/reservas.js';
import { obtenerUsuarios } from '@api/usuarios.js';
import { eliminarViaje, obtenerViajesDeConductor } from '@api/viajes.js';
import Button from '@components/Button.jsx';
import Card from '@components/Card.jsx';
import DialogoConfirmacion from '@components/DialogoConfirmacion.jsx';
import { useSesion } from '@context/SesionContext.jsx';
import {
  formatearFecha,
  formatearPrecio,
  nombreDireccion,
  textoAsientosDisponibles,
} from '@utils/formatos.js';

/**
 * Página del conductor: lista los viajes que publicó, con los pasajeros que
 * reservaron cada uno, y permite editarlos o cancelarlos (con confirmación).
 * @returns {JSX.Element} La página "Mis viajes publicados".
 */
const MisViajes = () => {
  const { usuario } = useSesion();
  const [version, setVersion] = useState(0);
  const [viajes, setViajes] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [viajeACancelar, setViajeACancelar] = useState(null);

  useEffect(() => {
    let activo = true;

    /**
     * Pide los viajes del conductor, todas las reservas y los usuarios
     * (para poder mostrar el nombre de cada pasajero).
     * @returns {Promise<void>} No retorna nada.
     */
    const cargarDatos = async () => {
      try {
        const [misViajes, todasLasReservas, todosLosUsuarios] =
          await Promise.all([
            obtenerViajesDeConductor(usuario.id),
            obtenerReservas(),
            obtenerUsuarios(),
          ]);

        if (activo) {
          setViajes(misViajes);
          setReservas(todasLasReservas);
          setUsuarios(todosLosUsuarios);
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

    cargarDatos();

    return () => {
      activo = false;
    };
  }, [usuario.id, version]);

  /**
   * Cancela el viaje elegido en la ventana de confirmación y actualiza la lista.
   * @returns {Promise<void>} No retorna nada.
   */
  const confirmarCancelacion = async () => {
    const id = viajeACancelar;
    setViajeACancelar(null);

    try {
      await eliminarViaje(id);
      setVersion((anterior) => anterior + 1);
    } catch {
      alert(ERROR_SERVIDOR);
    }
  };

  /**
   * Busca el nombre completo del pasajero de una reserva.
   * @param {Object} reserva - Reserva del viaje.
   * @returns {string} Nombre y apellido, o un aviso si el usuario ya no existe.
   */
  const nombreDelPasajero = (reserva) => {
    const pasajero = usuarios.find((u) => u.id === reserva.pasajeroId);

    return pasajero
      ? `${pasajero.nombre} ${pasajero.apellido}`
      : 'Pasajero no encontrado';
  };

  return (
    <>
      <p className="migas-de-pan">
        <Link to="/pasajero" className="enlace-migas">
          &larr; Buscar viajes como pasajero
        </Link>
      </p>

      <section className="seccion-contenido fila-encabezado-seccion">
        <div>
          <h2>Mis viajes publicados</h2>
          <p className="texto-secundario">
            Administrá tus viajes como conductor
          </p>
        </div>

        <Button to="/conductor/publicar">+ Publicar viaje</Button>
      </section>

      <section className="seccion-contenido">
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
            <ul className="listado-viajes">
              {viajes.map((viaje) => {
                const reservasDelViaje = reservas.filter(
                  (reserva) => reserva.viajeId === viaje.id,
                );

                return (
                  <li key={viaje.id}>
                    <Card
                      titulo={`${viaje.hora} · ${formatearFecha(viaje.fecha)}`}
                      clase="recuadro-viaje"
                    >
                      <p>{nombreDireccion(viaje.direccion)}</p>
                      <p>
                        {`${textoAsientosDisponibles(viaje.asientos)} · ${formatearPrecio(viaje.precio)} por asiento`}
                      </p>
                      <p>{`Punto de encuentro: ${viaje.puntoEncuentro}`}</p>

                      <div className="pasajeros-viaje">
                        <p className="titulo-pasajeros">
                          {reservasDelViaje.length === 1
                            ? 'Pasajero reservado:'
                            : 'Pasajeros reservados:'}
                        </p>
                        {reservasDelViaje.length === 0 ? (
                          <p className="texto-secundario">
                            Todavía no hay pasajeros reservados.
                          </p>
                        ) : (
                          <ul className="lista-pasajeros">
                            {reservasDelViaje.map((reserva) => (
                              <li key={reserva.id}>
                                {nombreDelPasajero(reserva)}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div className="acciones-viaje">
                        <Button
                          to={`/conductor/editar/${viaje.id}`}
                          variante="secundario"
                        >
                          Editar
                        </Button>
                        <Button
                          variante="peligro"
                          onClick={() => setViajeACancelar(viaje.id)}
                        >
                          Cancelar viaje
                        </Button>
                      </div>
                    </Card>
                  </li>
                );
              })}
            </ul>

            {viajes.length === 0 && (
              <div className="estado-vacio">
                <p className="icono-vacio">&#128663;</p>
                <h2>Sin viajes publicados</h2>
                <p className="texto-secundario">
                  Todavía no publicaste ningún viaje
                </p>
                <Button to="/conductor/publicar">
                  Publicar mi primer viaje
                </Button>
              </div>
            )}
          </>
        )}
      </section>

      <DialogoConfirmacion
        id="dialog-cancelar"
        abierto={viajeACancelar !== null}
        mensaje="¿Seguro que querés cancelar este viaje?"
        textoConfirmar="Sí, cancelar"
        textoCancelar="No"
        onConfirmar={confirmarCancelacion}
        onCancelar={() => setViajeACancelar(null)}
      />
    </>
  );
};

export default MisViajes;
