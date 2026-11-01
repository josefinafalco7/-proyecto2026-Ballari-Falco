import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import FormularioLogin from '@components/FormularioLogin.jsx';
import FormularioRegistro from '@components/FormularioRegistro.jsx';
import { useSesion } from '@context/SesionContext.jsx';
import { paginaInicio } from '@utils/sesion.js';

/**
 * Página de acceso: permite alternar entre crear una cuenta ("Registrarme")
 * e iniciar sesión ("Ya tengo cuenta"). Si ya hay una sesión iniciada, lleva
 * directo a la página principal del usuario.
 * @returns {JSX.Element} La página de acceso.
 */
const Acceso = () => {
  const { usuario } = useSesion();
  const [vista, setVista] = useState('registro');

  if (usuario) {
    return <Navigate to={paginaInicio(usuario)} replace />;
  }

  return (
    <section className="seccion-contenido">
      <div className="selector-cuenta">
        <button
          type="button"
          className={vista === 'registro' ? 'activo' : undefined}
          onClick={() => setVista('registro')}
        >
          Registrarme
        </button>
        <button
          type="button"
          className={vista === 'login' ? 'activo' : undefined}
          onClick={() => setVista('login')}
        >
          Ya tengo cuenta
        </button>
      </div>

      <div hidden={vista !== 'registro'}>
        <h2>Crear cuenta</h2>
        <p className="texto-secundario">Registrate para reservar viajes</p>
        <FormularioRegistro onRegistrado={() => setVista('login')} />
      </div>

      <div hidden={vista !== 'login'}>
        <h2>Iniciar sesión</h2>
        <p className="texto-secundario">Ingresá con tu cuenta existente</p>
        <FormularioLogin />
      </div>
    </section>
  );
};

export default Acceso;
