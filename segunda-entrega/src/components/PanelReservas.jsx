import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ERROR_SERVIDOR } from '@api/config.js';
import { eliminarReserva, obtenerReservasDePasajero } from '@api/reservas.js';
import { actualizarViaje, obtenerViajes } from '@api/viajes.js';
import Button from '@components/Button.jsx';
import {
  formatearFecha,
  formatearPrecio,
  nombreDireccion,
} from '@utils/formatos.js';

/**
 * Panel lateral "Mis reservas": muestra los viajes que reservó el pasajero,
 * la cantidad, el total a pagar y un botón para cancelar cada reserva.
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.usuarioId - Id del pasajero con sesión iniciada.
 * @param {number} props.version - Cambia cada vez que hay que volver a pedir los datos.
 * @param {Function} props.onCambio - Se ejecuta cuando se cancela una reserva, para actualizar la página.
 * @returns {JSX.Element} El panel.
 */
const PanelReservas = ({ usuarioId, version, onCambio }) => {
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let activo = true;

    /**
     * Pide las reservas del pasajero y los viajes, y los junta de a pares.
     * @returns {Promise<void>} No retorna nada.
     */
    const cargarReservas = async () => {
      try {
        const [reservas, viajes] = await Promise.all([
          obtenerReservasDePasajero(usuarioId),
          obtenerViajes(),
        ]);

        if (!activo) {
          return;
        }

        setItems(
          reservas
            .map((reserva) => ({
              reserva,
              viaje: viajes.find((viaje) => viaje.id === reserva.viajeId),
            }))
            .filter((item) => item.viaje),
        );
        setError('');
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

    cargarReservas();

    return () => {
      activo = false;
    };
  }, [usuarioId, version]);

  /**
   * Cancela una reserva: devuelve el asiento al viaje y borra la reserva.
   * @param {Object} item - La reserva con su viaje.
   * @returns {Promise<void>} No retorna nada.
   */
  const cancelarReserva = async (item) => {
    try {
      await actualizarViaje(item.viaje.id, {
        asientos: item.viaje.asientos + 1,
      });
      await eliminarReserva(item.reserva.id);
      onCambio();
    } catch {
      alert(ERROR_SERVIDOR);
    }
  };

  const total = items.reduce((suma, item) => suma + item.viaje.precio, 0);

  return (
    <aside className="seccion-contenido panel-reservas">
      <h2>Mis reservas</h2>

      {cargando && (
        <p role="status" className="texto-secundario">
          Cargando reservas...
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
            {`${items.length} ${items.length === 1 ? 'viaje reservado' : 'viajes reservados'}`}
          </p>

          <ul className="listado-reservas">
            {items.map(({ reserva, viaje }) => (
              <li key={reserva.id} className="item-reserva">
                <p className="reserva-ruta">
                  {nombreDireccion(viaje.direccion)}
                </p>
                <p>{`${formatearFecha(viaje.fecha)} · ${viaje.hora}`}</p>
                <p className="texto-secundario">
                  {`Conductor: ${viaje.conductorNombre}`}
                </p>
                <p>{formatearPrecio(viaje.precio)}</p>
                <Button
                  variante="peligro"
                  chico
                  onClick={() => cancelarReserva({ reserva, viaje })}
                >
                  Cancelar reserva
                </Button>
              </li>
            ))}
          </ul>

          {items.length === 0 ? (
            <p className="mensaje-vacio">Todavía no reservaste ningún viaje.</p>
          ) : (
            <p className="total-reservas">{`Total: ${formatearPrecio(total)}`}</p>
          )}
        </>
      )}
    </aside>
  );
};

PanelReservas.propTypes = {
  usuarioId: PropTypes.string.isRequired,
  version: PropTypes.number.isRequired,
  onCambio: PropTypes.func.isRequired,
};

export default PanelReservas;
