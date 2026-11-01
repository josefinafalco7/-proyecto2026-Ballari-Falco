import PropTypes from 'prop-types';
import Button from '@components/Button.jsx';
import Card from '@components/Card.jsx';
import Input from '@components/Input.jsx';
import Select from '@components/Select.jsx';
import { IDS_VIAJE } from '@utils/formularioViaje.js';
import { PRECIO_MAXIMO } from '@utils/validaciones.js';

const DIRECCIONES = [
  { valor: 'ucc-nc', texto: 'UCC → Nueva Córdoba' },
  { valor: 'nc-ucc', texto: 'Nueva Córdoba → UCC' },
];

/**
 * Formulario de un viaje, compartido por las páginas de publicar y de editar.
 * Muestra los campos en tres grupos y los errores de cada uno mientras se escribe.
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.formulario - Lo que devuelve useFormulario (valores, cambiar, errorVisible).
 * @param {boolean} props.publicar - true si es para publicar un viaje nuevo (muestra * y ejemplos), false si es para editar.
 * @param {string} props.textoBoton - Texto del botón de envío.
 * @param {Function} props.onSubmit - Función que se ejecuta al enviar el formulario.
 * @returns {JSX.Element} El formulario.
 */
const FormularioViaje = ({ formulario, publicar, textoBoton, onSubmit }) => {
  const { valores, cambiar, errorVisible } = formulario;
  const marca = publicar ? ' *' : '';

  return (
    <form onSubmit={onSubmit}>
      <Card titulo="Ruta y horario" clase="grupo-formulario">
        <Select
          id={IDS_VIAJE.direccion}
          etiqueta={`Dirección${marca}`}
          valor={valores.direccion}
          onChange={cambiar('direccion')}
          opciones={DIRECCIONES}
        />
        <Input
          id={IDS_VIAJE.hora}
          etiqueta={`Hora de salida${marca}`}
          tipo="time"
          valor={valores.hora}
          onChange={cambiar('hora')}
          required
        />
        <Input
          id={IDS_VIAJE.fecha}
          etiqueta={`Fecha${marca}`}
          tipo="date"
          valor={valores.fecha}
          onChange={cambiar('fecha')}
          error={errorVisible('fecha')}
          required
        />
      </Card>

      <Card titulo="Asientos y precio" clase="grupo-formulario">
        <Input
          id={IDS_VIAJE.asientos}
          etiqueta={`Asientos disponibles${marca}`}
          tipo="number"
          valor={valores.asientos}
          onChange={cambiar('asientos')}
          error={errorVisible('asientos')}
          placeholder={publicar ? 'Ej: 3' : undefined}
          size="4"
          min="1"
          max="4"
          required
        />
        <Input
          id={IDS_VIAJE.precio}
          etiqueta={`Precio por asiento${marca}`}
          tipo="number"
          valor={valores.precio}
          onChange={cambiar('precio')}
          error={errorVisible('precio')}
          placeholder={publicar ? '1500' : undefined}
          size="8"
          min="0"
          max={PRECIO_MAXIMO}
          required
        />
      </Card>

      <Card titulo="Punto de encuentro" clase="grupo-formulario">
        <Input
          id={IDS_VIAJE.puntoEncuentro}
          etiqueta={
            publicar
              ? '¿Dónde te encontrás con los pasajeros? *'
              : 'Punto de encuentro'
          }
          valor={valores.puntoEncuentro}
          onChange={cambiar('puntoEncuentro')}
          error={errorVisible('puntoEncuentro')}
          placeholder={publicar ? 'ej: Portón principal UCC' : undefined}
          size="40"
          maxLength="60"
          required
        />
      </Card>

      <Button type="submit" completo>
        {textoBoton}
      </Button>
    </form>
  );
};

FormularioViaje.propTypes = {
  formulario: PropTypes.shape({
    valores: PropTypes.object.isRequired,
    cambiar: PropTypes.func.isRequired,
    errorVisible: PropTypes.func.isRequired,
  }).isRequired,
  publicar: PropTypes.bool.isRequired,
  textoBoton: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FormularioViaje;
