/** Tipos de cuenta que pueden publicar y administrar viajes. */
export const ROLES_CONDUCTOR = ['conductor', 'ambos'];

/**
 * Indica si una cuenta puede publicar y administrar viajes.
 * @param {Object} usuario - Usuario con sesión iniciada.
 * @returns {boolean} true si la cuenta es de conductor o de ambos roles.
 */
export const esConductor = (usuario) =>
  ROLES_CONDUCTOR.includes(usuario.tipoCuenta);

/**
 * Devuelve la página principal que le corresponde a un usuario según su cuenta.
 * @param {Object} usuario - Usuario con sesión iniciada.
 * @returns {string} "/conductor" para cuentas de conductor, "/pasajero" para el resto.
 */
export const paginaInicio = (usuario) =>
  usuario.tipoCuenta === 'conductor' ? '/conductor' : '/pasajero';
