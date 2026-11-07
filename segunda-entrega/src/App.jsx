import { Route, Routes } from 'react-router-dom';
import Layout from '@layouts/Layout.jsx';
import RutaProtegida from '@components/RutaProtegida.jsx';
import Acceso from '@pages/Acceso.jsx';
import DetalleViaje from '@pages/DetalleViaje.jsx';
import EditarViaje from '@pages/EditarViaje.jsx';
import Home from '@pages/Home.jsx';
import MisViajes from '@pages/MisViajes.jsx';
import NotFound from '@pages/NotFound.jsx';
import Pasajero from '@pages/Pasajero.jsx';
import PublicarViaje from '@pages/PublicarViaje.jsx';
import ViajesPasajero from '@pages/ViajesPasajero.jsx';
import { ROLES_CONDUCTOR } from '@utils/sesion.js';

/**
 * Define las rutas de la aplicación. Todas comparten el Layout, y la página
 * de cada ruta se dibuja dentro de su Outlet. Las que necesitan sesión (o un
 * tipo de cuenta) pasan por RutaProtegida.
 * @returns {JSX.Element} Las rutas.
 */
const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="acceso" element={<Acceso />} />

      <Route element={<RutaProtegida />}>
        <Route path="pasajero/viaje/:id" element={<DetalleViaje />} />
        <Route path="conductor/editar/:id" element={<EditarViaje />} />
      </Route>

      <Route
        element={
          <RutaProtegida
            roles={ROLES_CONDUCTOR}
            mensajeRol="Esta sección es solamente para conductores."
            destinoRol="/pasajero"
          />
        }
      >
        <Route path="conductor" element={<MisViajes />} />
      </Route>

      <Route
        element={
          <RutaProtegida
            roles={ROLES_CONDUCTOR}
            mensajeRol="Tu cuenta es de pasajero y no puede publicar viajes."
            destinoRol="/pasajero"
          />
        }
      >
        <Route path="conductor/publicar" element={<PublicarViaje />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>

    <Route element={<Layout conLateral />}>
      <Route element={<RutaProtegida />}>
        <Route path="pasajero" element={<Pasajero />} />
        <Route path="pasajero/viajes/:direccion" element={<ViajesPasajero />} />
      </Route>
    </Route>
  </Routes>
);

export default App;
