import { Link, useNavigate } from 'react-router-dom';
import { ERROR_SERVIDOR } from '@api/config.js';
import { crearViaje } from '@api/viajes.js';
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
 * Página para publicar un viaje nuevo. Valida mientras se escribe y, al enviar,
 * guarda el viaje en el servicio simulado a nombre del conductor.
 * @returns {JSX.Element} La página de publicar viaje.
 */
const PublicarViaje = () => {
  const { usuario } = useSesion();
  const navigate = useNavigate();
  const formulario = useFormulario(VIAJE_VACIO, validarViaje, IDS_VIAJE);

  /**
   * Valida los datos y publica el viaje.
   * @param {Event} evento - Evento submit del formulario.
   * @returns {Promise<void>} No retorna nada.
   */
  const publicarViaje = async (evento) => {
    evento.preventDefault();

    if (formulario.avisarPrimerError(ORDEN_VIAJE)) {
      return;
    }

    const { valores } = formulario;

    try {
      await crearViaje({
        conductorId: usuario.id,
        conductorNombre: `${usuario.nombre} ${usuario.apellido}`,
        direccion: valores.direccion,
        hora: valores.hora,
        fecha: valores.fecha,
        asientos: Number(valores.asientos),
        precio: Number(valores.precio),
        puntoEncuentro: valores.puntoEncuentro.trim(),
      });

      alert('Viaje publicado correctamente.');
      navigate('/conductor');
    } catch {
      alert(ERROR_SERVIDOR);
    }
  };

  return (
    <>
      <p className="migas-de-pan">
        <Link to="/conductor" className="enlace-migas">
          &larr; Volver
        </Link>
        <Link to="/conductor" className="enlace-migas">
          Mis viajes &rarr;
        </Link>
      </p>

      <section className="seccion-contenido">
        <h2>Publicar un viaje</h2>
        <p className="texto-secundario">
          Completá los datos para que los pasajeros puedan encontrarte
        </p>

        <FormularioViaje
          formulario={formulario}
          publicar
          textoBoton="Publicar viaje"
          onSubmit={publicarViaje}
        />
      </section>
    </>
  );
};

export default PublicarViaje;
