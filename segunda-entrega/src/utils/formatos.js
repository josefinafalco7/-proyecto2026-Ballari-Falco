/**
 * Convierte una fecha "AAAA-MM-DD" (la que entrega un input date) a "DD/MM/AAAA".
 * @param {string} fecha - Fecha en formato AAAA-MM-DD.
 * @returns {string} Fecha en formato DD/MM/AAAA.
 */
export const formatearFecha = (fecha) => {
  const [anio, mes, dia] = fecha.split('-');
  return `${dia}/${mes}/${anio}`;
};

/**
 * Devuelve el nombre legible de la dirección de un viaje.
 * @param {string} direccion - "ucc-nc" o "nc-ucc".
 * @returns {string} Texto como "UCC → Nueva Córdoba".
 */
export const nombreDireccion = (direccion) =>
  direccion === 'nc-ucc' ? 'Nueva Córdoba → UCC' : 'UCC → Nueva Córdoba';

/**
 * Da formato a un precio en pesos.
 * @param {number} precio - Monto a mostrar.
 * @returns {string} Monto con el signo $, por ejemplo "$1500".
 */
export const formatearPrecio = (precio) => `$${precio}`;

/**
 * Arma el texto de asientos libres, en singular o plural según la cantidad.
 * @param {number} asientos - Cantidad de asientos disponibles.
 * @returns {string} Texto como "1 asiento disponible" o "3 asientos disponibles".
 */
export const textoAsientosDisponibles = (asientos) =>
  `${asientos} ${asientos === 1 ? 'asiento disponible' : 'asientos disponibles'}`;
