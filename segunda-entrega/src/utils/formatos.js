/**
 * Da formato de pesos argentinos a un número.
 * @param {number} precio - Monto a mostrar.
 * @returns {string} Monto con formato, por ejemplo "$ 1.500".
 */
export const formatearPrecio = (precio) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(precio);

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
