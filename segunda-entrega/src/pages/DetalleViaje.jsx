import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ERROR_SERVIDOR } from '@api/config.js';
import { crearReserva, obtenerReservasDeViaje } from '@api/reservas.js';
import { actualizarViaje, obtenerViaje } from '@api/viajes.js';
import Button from '@components/Button.jsx';
import EnlaceVolver from '@components/EnlaceVolver.jsx';
import { useSesion } from '@context/SesionContext.jsx';
import {
  formatearFecha,
  formatearPrecio,
  nombreDireccion,
} from '@utils/formatos.js';

/**
 * Página con el detalle de un viaje, para que el pasajero lo vea y lo reserve.
 * Si ya lo reservó o no quedan asientos, el botón queda deshabilitado.
 * @returns {JSX.Element} La página de detalle.
 */
const DetalleViaje = () => {
  const { id } = useParams();
  const { usuario } = useSesion();
  const navigate = useNavigate();
  const [viaje, setViaje] = useState(null);
  const [yaReservado, setYaReservado] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let activo = true;

    /**
     * Pide el viaje y sus reservas, para saber si el usuario ya lo reservó.
     * @returns {Promise<void>} No retorna nada.
     */
    const cargarViaje = async () => {
      try {
        const [datosViaje, reservas] = await Promise.all([
          obtenerViaje(id),
          obtenerReservasDeViaje(id),
        ]);

        if (activo) {
          setViaje(datosViaje);
          setYaReservado(
            reservas.some((reserva) => reserva.pasajeroId === usuario.id),
          );
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

    cargarViaje();

    return () => {
      activo = false;
    };
  }, [id, usuario.id]);

  /**
   * Reserva el viaje: resta un asiento, guarda la reserva y vuelve a la página del pasajero.
   * @returns {Promise<void>} No retorna nada.
   */
  const reservarViaje = async () => {
    if (!viaje || viaje.asientos < 1) {
      return;
    }

    if (yaReservado) {
      alert('Ya reservaste este viaje.');
      return;
    }

    try {
      await actualizarViaje(viaje.id, { asientos: viaje.asientos - 1 });
      await crearReserva({ viajeId: viaje.id, pasajeroId: usuario.id });
      alert('¡Viaje reservado!');
      navigate('/pasajero');
    } catch {
      alert(ERROR_SERVIDOR);
    }
  };

  let titulo = 'Detalle del viaje';
  let textoBoton = 'Reservar viaje';

  if (viaje) {
    titulo = nombreDireccion(viaje.direccion);

    if (yaReservado) {
      textoBoton = 'Ya reservaste este viaje';
    } else if (viaje.asientos < 1) {
      textoBoton = 'Sin asientos disponibles';
    }
  } else if (!cargando && !error) {
    titulo = 'Viaje no encontrado';
  }

  return (
    <>
      <p className="migas-de-pan">
        <EnlaceVolver />
      </p>

      <section className="seccion-contenido">
        <h2>{titulo}</h2>
        <p className="texto-secundario">
          Consultá o modificá los datos del viaje
        </p>

        {cargando && (
          <p role="status" className="texto-secundario">
            Cargando viaje...
          </p>
        )}
        {error && (
          <p role="alert" className="mensaje-error">
            {error}
          </p>
        )}

        {viaje && (
          <div>
            <div className="detalle-fila">
              <span>Dirección</span>
              <span>{nombreDireccion(viaje.direccion)}</span>
            </div>
            <div className="detalle-fila">
              <span>Conductor</span>
              <span>{viaje.conductorNombre}</span>
            </div>
            <div className="detalle-fila">
              <span>Hora de salida</span>
              <span>{viaje.hora}</span>
            </div>
            <div className="detalle-fila">
              <span>Fecha</span>
              <span>{formatearFecha(viaje.fecha)}</span>
            </div>
            <div className="detalle-fila">
              <span>Asientos disponibles</span>
              <span>{viaje.asientos}</span>
            </div>
            <div className="detalle-fila">
              <span>Punto de encuentro</span>
              <span>{viaje.puntoEncuentro}</span>
            </div>
            <div className="detalle-fila">
              <span>Precio</span>
              <span>{formatearPrecio(viaje.precio)}</span>
            </div>

            <Button
              id="boton-reservar"
              completo
              disabled={yaReservado || viaje.asientos < 1}
              onClick={reservarViaje}
            >
              {textoBoton}
            </Button>
          </div>
        )}
      </section>
    </>
  );
};

export default DetalleViaje;
