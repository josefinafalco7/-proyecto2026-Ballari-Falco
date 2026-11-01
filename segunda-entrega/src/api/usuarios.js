import { enviar, solicitar } from '@api/cliente.js';

/**
 * Pide la lista completa de usuarios registrados.
 * @returns {Promise<Array<Object>>} Lista de usuarios.
 */
export const obtenerUsuarios = () => solicitar('/usuarios');

/**
 * Busca los usuarios que tienen un email determinado.
 * @param {string} email - Email a buscar, en minúsculas.
 * @returns {Promise<Array<Object>>} Usuarios con ese email (vacío si no hay ninguno).
 */
export const obtenerUsuariosPorEmail = (email) =>
  solicitar(`/usuarios?email=${encodeURIComponent(email)}`);

/**
 * Registra un usuario nuevo.
 * @param {Object} usuario - Datos del usuario (nombre, apellido, email, password, tipoCuenta).
 * @returns {Promise<Object>} El usuario creado, ya con su id.
 */
export const crearUsuario = (usuario) => enviar('/usuarios', 'POST', usuario);
