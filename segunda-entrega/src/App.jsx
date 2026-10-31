import { Route, Routes } from 'react-router-dom';
import Layout from '@components/Layout.jsx';
import Home from '@pages/Home.jsx';
import NotFound from '@pages/NotFound.jsx';

/**
 * Define las rutas de la aplicación. Todas comparten el Layout, y la página
 * de cada ruta se dibuja dentro de su Outlet.
 * @returns {JSX.Element} Las rutas.
 */
const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default App;
