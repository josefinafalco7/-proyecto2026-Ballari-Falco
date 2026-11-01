import { useNavigate } from 'react-router-dom';
import Button from '@components/Button.jsx';

/**
 * Página que se muestra cuando la dirección escrita no existe (error 404).
 * @returns {JSX.Element} La página de error.
 */
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="seccion-contenido">
      <h2>Página no encontrada</h2>
      <p className="texto-secundario">La dirección que escribiste no existe.</p>
      <Button onClick={() => navigate('/')}>Volver al inicio</Button>
    </section>
  );
};

export default NotFound;
