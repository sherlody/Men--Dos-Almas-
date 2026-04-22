
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PaginaPrincipal from './paginas/PaginaPrincipal';
import Login from './paginas/Login';
import DashboardEmpleado from './paginas/DashboardEmpleado';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardEmpleado />} />
      </Routes>
    </Router>
  )
}

export default App
