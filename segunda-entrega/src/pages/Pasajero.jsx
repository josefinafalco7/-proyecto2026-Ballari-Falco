import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@components/Button.jsx';
import Card from '@components/Card.jsx';
import PanelReservas from '@components/PanelReservas.jsx';
import { useSesion } from '@context/SesionContext.jsx';
import { esConductor } from '@utils/sesion.js';

const DIRECCIONES = [
  {
    clave: 'ucc-nc',
    titulo: 'Desde la UCC hacia Nueva Córdoba',
    descripcion: 'Desde el campus universitario hacia el centro',
  },
  {
    clave: 'nc-ucc',
    titulo: 'Desde Nueva Córdoba hacia la UCC',
    descripcion: 'Desde Nueva Córdoba hacia el campus universitario',
  },
];

/**
 * Página del pasajero: permite elegir la dirección del viaje y muestra
 * el panel con sus reservas.
 * @returns {JSX.Element} La página del pasajero.
 */
const Pasajero = () => {
  const { usuario } = useSesion();
  const [version, setVersion] = useState(0);

  return (
    <>
      <p className="migas-de-pan">
        <Link to="/" className="enlace-migas">
          &larr; Volver al inicio
        </Link>
        {esConductor(usuario) && (
          <Link to="/conductor" className="enlace-migas">
            Mis viajes (conductor) &rarr;
          </Link>
        )}
      </p>

      <section className="seccion-contenido">
        <h2>¿A dónde querés ir?</h2>
        <p className="texto-secundario">Seleccioná la dirección de tu viaje</p>

        <div className="grilla-direcciones">
          {DIRECCIONES.map((direccion) => (
            <Card
              key={direccion.clave}
              titulo={direccion.titulo}
              clase="recuadro-direccion"
            >
              <p className="texto-secundario">{direccion.descripcion}</p>
              <Button
                to={`/pasajero/viajes/${direccion.clave}`}
                variante="secundario"
                completo
              >
                Ver viajes disponibles
              </Button>
            </Card>
          ))}
        </div>

        <div className="caja-distancia">
          <p>
            <strong>Distancia entre puntos</strong>
          </p>
          <p className="texto-secundario">
            11 km · aproximadamente 25 minutos en auto
          </p>
        </div>
      </section>

      <PanelReservas
        usuarioId={usuario.id}
        version={version}
        onCambio={() => setVersion((anterior) => anterior + 1)}
      />
    </>
  );
};

export default Pasajero;
