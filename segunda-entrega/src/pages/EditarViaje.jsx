import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ERROR_SERVIDOR } from '@api/config.js';
import { actualizarViaje, obtenerViaje } from '@api/viajes.js';
import EnlaceVolver from '@components/EnlaceVolver.jsx';
import FormularioViaje from '@components/FormularioViaje.jsx';
import { useSesion } from '@context/SesionContext.jsx';
import { useFormulario } from '@hooks/useFormulario.js';
import {
  IDS_VIAJE,
  ORDEN_VIAJE,
  VIAJE_VACIO,
  validarViaje,
} from '@utils/formularioViaje.js';

/**
 * Página para editar un viaje ya publicado. Solo lo puede editar su conductor.
 * El formulario se completa con los datos actuales del viaje.
 * @returns {JSX.Element} La página de edición.
 */
const EditarViaje = () => {
  const { id } = useParams();
  const { usuario } = useSesion();
  const navigate = useNavigate();
  const formulario = useFormulario(VIAJE_VACIO, validarViaje, IDS_VIAJE);
  const { setValores } = formulario;
  const [estado, setEstado] = useState('cargando');

  useEffect(() => {
    let activo = true;

    /**
     * Pide el viaje, comprueba que sea del usuario y completa el formulario.
     * @returns {Promise<void>} No retorna nada.
     */
    const cargarViaje = async () => {
      try {
        const viaje = await obtenerViaje(id);

        if (!activo) {
          return;
        }

        if (!viaje) {
          setEstado('noEncontrado');
          return;
        }

        if (viaje.conductorId !== usuario.id) {
          alert('No podés editar un viaje que no publicaste vos.');
          navigate('/conductor', { replace: true });
          return;
        }

        setValores({
          direccion: viaje.direccion,
          hora: viaje.hora,
          fecha: viaje.fecha,
          asientos: String(viaje.asientos),
          precio: String(viaje.precio),
          puntoEncuentro: viaje.puntoEncuentro,
        });
        setEstado('listo');
      } catch {
        if (activo) {
          setEstado('error');
        }
      }
    };

    cargarViaje();

    return () => {
      activo = false;
    };
  }, [id, usuario.id, navigate, setValores]);

  /**
   * Valida los cambios y los guarda en el viaje.
   * @param {Event} evento - Evento submit del formulario.
   * @returns {Promise<void>} No retorna nada.
   */
  const guardarEdicionViaje = async (evento) => {
    evento.preventDefault();

    if (formulario.avisarPrimerError(ORDEN_VIAJE)) {
      return;
    }

    const { valores } = formulario;

    try {
      await actualizarViaje(id, {
        direccion: valores.direccion,
        hora: valores.hora,
        fecha: valores.fecha,
        asientos: Number(valores.asientos),
        precio: Number(valores.precio),
        puntoEncuentro: valores.puntoEncuentro.trim(),
      });

      alert('Cambios guardados correctamente.');
      navigate('/conductor');
    } catch {
      alert(ERROR_SERVIDOR);
    }
  };

  return (
    <>
      <p className="migas-de-pan">
        <EnlaceVolver />
      </p>

      <section className="seccion-contenido">
        <h2>
          {estado === 'noEncontrado'
            ? 'Viaje no encontrado'
            : 'Detalle del viaje'}
        </h2>
        <p className="texto-secundario">
          Consultá o modificá los datos del viaje
        </p>

        {estado === 'cargando' && (
          <p role="status" className="texto-secundario">
            Cargando viaje...
          </p>
        )}
        {estado === 'error' && (
          <p role="alert" className="mensaje-error">
            {ERROR_SERVIDOR}
          </p>
        )}

        {estado === 'listo' && (
          <FormularioViaje
            formulario={formulario}
            publicar={false}
            textoBoton="Guardar cambios"
            onSubmit={guardarEdicionViaje}
          />
        )}
      </section>
    </>
  );
};

export default EditarViaje;
