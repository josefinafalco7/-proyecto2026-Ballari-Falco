import { useState } from 'react';

/**
 * Maneja el estado de un formulario controlado con validación en tiempo real.
 * Cada campo se marca como "tocado" cuando el usuario escribe, y recién ahí
 * se le muestra su mensaje de error.
 * @param {Object} inicial - Valores iniciales de los campos.
 * @param {Function} validar - Recibe los valores y devuelve un objeto con el mensaje de error de cada campo.
 * @param {Object} ids - Id de cada campo en la página, para devolver el foco al que está mal.
 * @returns {Object} Valores, errores y funciones para manejar el formulario.
 */
export const useFormulario = (inicial, validar, ids) => {
  const [valores, setValores] = useState(inicial);
  const [tocados, setTocados] = useState({});
  const errores = validar(valores);

  /**
   * Crea el manejador onChange de un campo.
   * @param {string} campo - Nombre del campo.
   * @returns {Function} Función que guarda el valor escrito y marca el campo como tocado.
   */
  const cambiar = (campo) => (evento) => {
    const valor = evento.target.value;
    setValores((previos) => ({ ...previos, [campo]: valor }));
    setTocados((previos) => ({ ...previos, [campo]: true }));
  };

  /**
   * Devuelve el error de un campo, solo si el usuario ya lo tocó.
   * @param {string} campo - Nombre del campo.
   * @returns {string} Mensaje de error o cadena vacía.
   */
  const errorVisible = (campo) =>
    tocados[campo] ? (errores[campo] ?? '') : '';

  /**
   * Revisa los campos en orden. Con el primero que esté mal avisa con un alert,
   * lo vacía y le devuelve el foco.
   * @param {Array<string>} orden - Nombres de los campos, en el orden a revisar.
   * @returns {boolean} true si encontró un error (y no hay que seguir con el envío).
   */
  const avisarPrimerError = (orden) => {
    const campo = orden.find((nombre) => errores[nombre]);

    if (!campo) {
      return false;
    }

    alert(errores[campo]);
    setValores((previos) => ({ ...previos, [campo]: '' }));
    setTocados((previos) => ({ ...previos, [campo]: true }));
    document.getElementById(ids[campo])?.focus();
    return true;
  };

  /**
   * Vacía un campo y lo marca como tocado.
   * @param {string} campo - Nombre del campo.
   * @returns {void} No retorna nada.
   */
  const vaciar = (campo) => {
    setValores((previos) => ({ ...previos, [campo]: '' }));
    setTocados((previos) => ({ ...previos, [campo]: true }));
    document.getElementById(ids[campo])?.focus();
  };

  /**
   * Vuelve el formulario a su estado inicial.
   * @returns {void} No retorna nada.
   */
  const reiniciar = () => {
    setValores(inicial);
    setTocados({});
  };

  return {
    valores,
    setValores,
    cambiar,
    errorVisible,
    avisarPrimerError,
    vaciar,
    reiniciar,
  };
};
