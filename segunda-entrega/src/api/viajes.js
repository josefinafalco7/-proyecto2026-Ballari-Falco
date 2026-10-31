import { API_URL } from '@api/config.js';

/**
 * Pide al servicio simulado la lista completa de viajes publicados.
 * @returns {Promise<Array<Object>>} Lista de viajes.
 * @throws {Error} Si el servidor responde con error o no está disponible.
 */
export const obtenerViajes = async () => {
  const respuesta = await fetch(`${API_URL}/viajes`);

  if (!respuesta.ok) {
    throw new Error('No se pudieron obtener los viajes');
  }

  return respuesta.json();
};
