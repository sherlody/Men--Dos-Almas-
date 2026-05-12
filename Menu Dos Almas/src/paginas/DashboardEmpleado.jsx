import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import './DashboardEmpleado.css';
import { 
  HiOutlineHome, HiOutlineAdjustments, HiOutlineDuplicate, 
  HiOutlineUserCircle, HiOutlineCog, HiOutlineLogout, HiOutlineSearch, HiOutlineBell, 
  HiOutlineClipboardList,
  HiOutlineIdentification
} from "react-icons/hi";


function DashboardEmpleado() {
    const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      
      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <span>Dos Almas</span>
        </div>
        
        <div className="header-icons">
          <HiOutlineSearch className="icon" />
          <HiOutlineBell className="icon" />
          <div className="profile-circle">
            <img src="https://i.pinimg.com/564x/de/0f/3d/de0f3d06d2c6dbf29a888cf78e4c0323.jpg" alt="Profile" />
          </div>
        </div>
      </header>

      {/* CUERPO DEL DASHBOARD */}
      <div className="dashboard-body">
        
        {/* SIDEBAR - Siempre visible y con ancho fijo */}
        <aside className="sidebar">
          <div className="sidebar-group">
            <SidebarItem icon={<HiOutlineHome />} label="Inicio"  onClick={() => navigate("/dashboard")} />
            <SidebarItem icon={<HiOutlineAdjustments />} label="Ajustes menú" onClick={()=> navigate("/dashboard/ajustes-menu")} />
            <SidebarItem icon={<HiOutlineClipboardList />} label="Catalogo" onClick={() => navigate("/dashboard/catalogo")} />
          </div>

          <div className="sidebar-group">
            <SidebarItem icon={<HiOutlineUserCircle />} label="Perfil" />
            <SidebarItem icon={<HiOutlineCog />} label="Configuración" />
            <SidebarItem icon= {<HiOutlineIdentification />} label="Usuarios" onClick={()=> navigate("/dashboard/usuarios")}/>
            <SidebarItem icon={<HiOutlineLogout />} label="Cerrar sesión" onClick={() => {localStorage.removeItem("isLoggedIn"); navigate("/login"); }} />
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL - Se ajusta al espacio restante */}
        <main className="main-content">
            <Outlet />
          
        </main>
      </div>
    </div>
  );
}

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div 
    className={`sidebar-item ${active ? 'active' : ''}`}
    onClick={onClick}
    style={{ cursor: "pointer" }}
  >
    <div className="item-content">
      <span className="item-icon">{icon}</span>
      <span className="item-label">{label}</span>
    </div>
    <span className="item-arrow">❯</span>
  </div>
);

export default DashboardEmpleado;