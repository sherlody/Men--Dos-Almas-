
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PaginaPrincipal from './paginas/PaginaPrincipal';
import Login from './paginas/Login';
import DashboardEmpleado from './paginas/DashboardEmpleado';
import DashboardInicio from './paginas/DashboardInicio';
import Catalogo from './paginas/Catalogo';
import AjustesMenu from './paginas/AjustesMenu';
import Usuarios from './paginas/Usuarios';
import DashboardCliente from './paginas/DashboardCliente';
import PaginaCocinero from './paginas/PaginaCocinero';

function App() {

  return (
    <Router>
      <Routes>

        {/* PUBLICAS */}
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard-cliente" element={<DashboardCliente />} />
        <Route path="/cocinero" element={<PaginaCocinero />} />
        <Route path="/dashboard-cliente/:mesaId" element={<DashboardCliente />} />
        <Route path="/pagina-cocinero" element={<PaginaCocinero />} />

        {/* DASHBOARD (PADRE) */}
        <Route path="/dashboard" element={<DashboardEmpleado />}>
          <Route index element={<DashboardInicio />} /> {/* /dashboard */}
          <Route path="catalogo" element={<Catalogo />} /> {/* /dashboard/catalogo */}
          <Route path="ajustes-menu" element={<AjustesMenu />} /> {/* /dashboard/ajustes-menu */}
          <Route path="usuarios" element={<Usuarios />} /> {/* /dashboard/usuarios */}
        </Route>

      </Routes>
    </Router>
  )
}

export default App
