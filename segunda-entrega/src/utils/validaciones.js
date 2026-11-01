/** Precio máximo permitido por asiento, en pesos. */
export const PRECIO_MAXIMO = 20000;

/**
 * Devuelve la fecha de hoy en formato AAAA-MM-DD.
 * @returns {string} Fecha de hoy.
 */
export const fechaDeHoy = () => new Date().toISOString().split('T')[0];

/**
 * Comprueba que un texto no esté vacío ni sea solo espacios.
 * @param {string} valor - Texto ingresado.
 * @param {string} nombreCampo - Nombre del campo, para armar el mensaje.
 * @returns {string} Mensaje de error, o cadena vacía si el valor es válido.
 */
export const validarTextoObligatorio = (valor, nombreCampo) =>
  valor.trim() === '' ? `El campo ${nombreCampo} no puede quedar vacío.` : '';

/**
 * Comprueba que el email sea una dirección @ucc.edu.ar.
 * @param {string} valor - Email ingresado.
 * @returns {string} Mensaje de error, o cadena vacía si el valor es válido.
 */
export const validarEmailUniversitario = (valor) => {
  if (valor.trim() === '') {
    return validarTextoObligatorio(valor, 'Email');
  }

  return valor.trim().toLowerCase().endsWith('@ucc.edu.ar')
    ? ''
    : 'Usá tu email universitario (tiene que terminar en @ucc.edu.ar).';
};

/**
 * Comprueba que la contraseña tenga al menos 4 caracteres.
 * @param {string} valor - Contraseña ingresada.
 * @returns {string} Mensaje de error, o cadena vacía si el valor es válido.
 */
export const validarContrasena = (valor) => {
  if (valor === '') {
    return validarTextoObligatorio(valor, 'Contraseña');
  }

  return valor.length >= 4
    ? ''
    : 'La contraseña tiene que tener al menos 4 caracteres.';
};

/**
 * Comprueba que una fecha no sea anterior al día de hoy.
 * @param {string} valor - Fecha ingresada (AAAA-MM-DD).
 * @returns {string} Mensaje de error, o cadena vacía si el valor es válido.
 */
export const validarFechaFutura = (valor) => {
  if (valor === '') {
    return validarTextoObligatorio(valor, 'Fecha');
  }

  return valor >= fechaDeHoy() ? '' : 'La fecha no puede ser anterior a hoy.';
};

/**
 * Comprueba que la cantidad de asientos esté entre 1 y 4.
 * @param {string} valor - Cantidad ingresada.
 * @returns {string} Mensaje de error, o cadena vacía si el valor es válido.
 */
export const validarAsientos = (valor) => {
  if (valor === '') {
    return validarTextoObligatorio(valor, 'Asientos');
  }

  const asientos = Number(valor);

  return asientos >= 1 && asientos <= 4
    ? ''
    : 'La cantidad de asientos tiene que ser entre 1 y 4.';
};

/**
 * Comprueba que el precio no sea negativo ni supere el máximo permitido.
 * @param {string} valor - Precio ingresado.
 * @returns {string} Mensaje de error, o cadena vacía si el valor es válido.
 */
export const validarPrecio = (valor) => {
  if (valor === '') {
    return validarTextoObligatorio(valor, 'Precio');
  }

  const precio = Number(valor);

  if (precio < 0) {
    return 'El precio no puede ser negativo.';
  }

  return precio > PRECIO_MAXIMO
    ? `El precio por asiento no puede superar $${PRECIO_MAXIMO}.`
    : '';
};
