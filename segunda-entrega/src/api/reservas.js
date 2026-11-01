import { enviar, solicitar } from '@api/cliente.js';

/**
 * Pide todas las reservas guardadas.
 * @returns {Promise<Array<Object>>} Lista de reservas.
 */
export const obtenerReservas = () => solicitar('/reservas');

/**
 * Pide las reservas hechas por un pasajero. Se filtran acá y no en el servidor,
 * porque json-server compara los ids como números y los nuestros son texto.
 * @param {string} pasajeroId - Id del pasajero.
 * @returns {Promise<Array<Object>>} Reservas de ese pasajero.
 */
export const obtenerReservasDePasajero = async (pasajeroId) => {
  const reservas = await obtenerReservas();
  return reservas.filter((reserva) => reserva.pasajeroId === pasajeroId);
};

/**
 * Pide las reservas que tiene un viaje.
 * @param {string} viajeId - Id del viaje.
 * @returns {Promise<Array<Object>>} Reservas de ese viaje.
 */
export const obtenerReservasDeViaje = async (viajeId) => {
  const reservas = await obtenerReservas();
  return reservas.filter((reserva) => reserva.viajeId === viajeId);
};

/**
 * Guarda una reserva nueva.
 * @param {Object} reserva - Datos de la reserva (viajeId y pasajeroId).
 * @returns {Promise<Object>} La reserva creada, ya con su id.
 */
export const crearReserva = (reserva) => enviar('/reservas', 'POST', reserva);

/**
 * Elimina una reserva.
 * @param {string} id - Id de la reserva.
 * @returns {Promise<void>} No retorna nada.
 */
export const eliminarReserva = async (id) => {
  await solicitar(`/reservas/${id}`, { method: 'DELETE' });
};
