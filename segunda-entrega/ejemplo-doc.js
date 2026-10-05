/* eslint-disable */
/**
 * Calcula el área de un rectángulo.
 *
 * @param {number} ancho - El ancho del rectángulo
 * @param {number} alto - El alto del rectángulo
 * @returns {number} El área del rectángulo
 */
function calcularArea(ancho, alto) {
  return ancho * alto;
}

/**
 * Crea un nuevo usuario en el sistema.
 *
 * @param {string} nombre - Nombre del usuario
 * @param {number} [edad] - Edad del usuario (opcional)
 * @param {object} opciones - Opciones de configuración
 * @param {boolean} opciones.activo - Estado del usuario
 * @param {string} opciones.rol - Rol del usuario
 */
function crearUsuario(nombre, edad, opciones) {
  const datosUsuario = {
    nombreUsuario: nombre,
    edadUsuario: edad,
    estado: opciones.activo,
    rolUsuario: opciones.rol,
  };
  console.log("Usuario creado con éxito:", datosUsuario);
}

calcularArea(5, 10);
crearUsuario("Josefina", 20, { activo: true, rol: "admin" });
