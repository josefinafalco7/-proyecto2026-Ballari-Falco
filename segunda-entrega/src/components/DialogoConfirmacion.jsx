import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@components/Button.jsx';

/**
 * Ventana de confirmación (dialog) con dos botones: confirmar y cancelar.
 * Se abre y se cierra según la propiedad "abierto".
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.id - Id HTML del dialog.
 * @param {boolean} props.abierto - Si la ventana está abierta.
 * @param {string} props.mensaje - Pregunta que se le hace al usuario.
 * @param {string} props.textoConfirmar - Texto del botón que confirma.
 * @param {string} props.textoCancelar - Texto del botón que cancela.
 * @param {Function} props.onConfirmar - Función que se ejecuta al confirmar.
 * @param {Function} props.onCancelar - Función que se ejecuta al cancelar o cerrar la ventana.
 * @returns {JSX.Element} El dialog.
 */
const DialogoConfirmacion = ({
  id,
  abierto,
  mensaje,
  textoConfirmar,
  textoCancelar,
  onConfirmar,
  onCancelar,
}) => {
  const dialogo = useRef(null);

  useEffect(() => {
    const elemento = dialogo.current;

    if (abierto && !elemento.open) {
      elemento.showModal();
    }

    if (!abierto && elemento.open) {
      elemento.close();
    }
  }, [abierto]);

  return (
    <dialog id={id} ref={dialogo} onClose={onCancelar}>
      <p>{mensaje}</p>
      <div className="dialog-acciones">
        <Button onClick={onConfirmar}>{textoConfirmar}</Button>
        <Button variante="fantasma" onClick={onCancelar}>
          {textoCancelar}
        </Button>
      </div>
    </dialog>
  );
};

DialogoConfirmacion.propTypes = {
  id: PropTypes.string.isRequired,
  abierto: PropTypes.bool.isRequired,
  mensaje: PropTypes.string.isRequired,
  textoConfirmar: PropTypes.string.isRequired,
  textoCancelar: PropTypes.string.isRequired,
  onConfirmar: PropTypes.func.isRequired,
  onCancelar: PropTypes.func.isRequired,
};

export default DialogoConfirmacion;
