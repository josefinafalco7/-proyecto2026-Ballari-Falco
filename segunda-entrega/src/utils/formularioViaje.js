import {
  validarAsientos,
  validarFechaFutura,
  validarPrecio,
  validarTextoObligatorio,
} from '@utils/validaciones.js';

/** Valores de un formulario de viaje sin completar. */
export const VIAJE_VACIO = {
  direccion: 'ucc-nc',
  hora: '',
  fecha: '',
  asientos: '',
  precio: '',
  puntoEncuentro: '',
};

/** Id de cada campo del formulario de viaje, para devolverle el foco. */
export const IDS_VIAJE = {
  direccion: 'direccion',
  hora: 'hora',
  fecha: 'fecha',
  asientos: 'asientos',
  precio: 'precio',
  puntoEncuentro: 'punto-encuentro',
};

/** Campos del formulario de viaje que se validan, en el orden en que se revisan. */
export const ORDEN_VIAJE = ['fecha', 'asientos', 'precio', 'puntoEncuentro'];

/**
 * Valida los campos de un viaje.
 * @param {Object} valores - Valores actuales del formulario.
 * @returns {Object} Mensaje de error de cada campo (cadena vacía si está bien).
 */
export const validarViaje = (valores) => ({
  fecha: validarFechaFutura(valores.fecha),
  asientos: validarAsientos(valores.asientos),
  precio: validarPrecio(valores.precio),
  puntoEncuentro: validarTextoObligatorio(
    valores.puntoEncuentro,
    'Punto de encuentro',
  ),
});
