import { enviar, solicitar } from '@api/cliente.js';
import { eliminarReserva, obtenerReservasDeViaje } from '@api/reservas.js';

/**
 * Pide la lista completa de viajes publicados.
 * @returns {Promise<Array<Object>>} Lista de viajes.
 */
export const obtenerViajes = () => solicitar('/viajes');

/**
 * Pide un viaje por su id. Lo busca dentro de la lista de viajes, en vez de pedir
 * "/viajes/:id", para que un viaje inexistente no deje un error 404 en la consola.
 * @param {string} id - Id del viaje.
 * @returns {Promise<Object|null>} El viaje, o null si no existe.
 */
export const obtenerViaje = async (id) => {
  const viajes = await obtenerViajes();
  return viajes.find((viaje) => viaje.id === id) ?? null;
};

/**
 * Pide los viajes publicados por un conductor. Se filtran acá y no en el servidor,
 * porque json-server compara los ids como números y los nuestros son texto.
 * @param {string} conductorId - Id del conductor.
 * @returns {Promise<Array<Object>>} Viajes de ese conductor.
 */
export const obtenerViajesDeConductor = async (conductorId) => {
  const viajes = await obtenerViajes();
  return viajes.filter((viaje) => viaje.conductorId === conductorId);
};

/**
 * Publica un viaje nuevo.
 * @param {Object} viaje - Datos del viaje.
 * @returns {Promise<Object>} El viaje creado, ya con su id.
 */
export const crearViaje = (viaje) => enviar('/viajes', 'POST', viaje);

/**
 * Modifica algunos campos de un viaje.
 * @param {string} id - Id del viaje.
 * @param {Object} cambios - Campos a modificar.
 * @returns {Promise<Object>} El viaje ya modificado.
 */
export const actualizarViaje = (id, cambios) =>
  enviar(`/viajes/${id}`, 'PATCH', cambios);

/**
 * Elimina un viaje junto con las reservas que tenía.
 * @param {string} id - Id del viaje.
 * @returns {Promise<void>} No retorna nada.
 */
export const eliminarViaje = async (id) => {
  const reservas = await obtenerReservasDeViaje(id);
  await Promise.all(reservas.map((reserva) => eliminarReserva(reserva.id)));
  await solicitar(`/viajes/${id}`, { method: 'DELETE' });
};
