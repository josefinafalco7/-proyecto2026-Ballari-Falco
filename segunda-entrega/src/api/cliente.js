import { API_URL } from '@api/config.js';

/**
 * Hace un pedido al servicio simulado y devuelve la respuesta ya convertida a objeto.
 * @param {string} ruta - Ruta del recurso, por ejemplo "/viajes".
 * @param {RequestInit} [opciones] - Opciones de fetch (método, cabeceras, cuerpo).
 * @returns {Promise<Object|Array>} Los datos recibidos.
 * @throws {Error} Si el servidor responde con error o no está disponible.
 */
export const solicitar = async (ruta, opciones = {}) => {
  const respuesta = await fetch(`${API_URL}${ruta}`, opciones);

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al pedir ${ruta}`);
  }

  return respuesta.json();
};

/**
 * Envía datos al servicio simulado en formato JSON (crear o modificar).
 * @param {string} ruta - Ruta del recurso, por ejemplo "/viajes".
 * @param {string} metodo - "POST" para crear o "PATCH" para modificar.
 * @param {Object} datos - Datos a enviar.
 * @returns {Promise<Object>} El recurso creado o modificado.
 */
export const enviar = (ruta, metodo, datos) =>
  solicitar(ruta, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
