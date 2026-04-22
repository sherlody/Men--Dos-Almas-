import { useNavigate } from "react-router-dom";
import './DashboardEmpleado.css';
import { 
  HiOutlineHome, HiOutlineAdjustments, HiOutlineDuplicate, 
  HiOutlineUserCircle, HiOutlineCog, HiOutlineLogout, HiOutlineSearch, HiOutlineBell 
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
            <SidebarItem icon={<HiOutlineHome />} label="Inicio" active />
            <SidebarItem icon={<HiOutlineAdjustments />} label="Some menu item" />
            <SidebarItem icon={<HiOutlineDuplicate />} label="Another menu item" />
          </div>

          <div className="sidebar-group">
            <SidebarItem icon={<HiOutlineUserCircle />} label="Perfil" />
            <SidebarItem icon={<HiOutlineCog />} label="Configuración" />
            <SidebarItem icon={<HiOutlineLogout />} label="Cerrar sesión" onClick={() => navigate("/login")} />
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL - Se ajusta al espacio restante */}
        <main className="main-content">
          <div className="top-cards">
            <div className="card welcome-card">
               <div className="card-info">
                  <p>Welcome</p>
                  <h2>Dash</h2>
               </div>
               <span className="badge">01:51</span>
            </div>

            <div className="card inbox-card">
               <div className="card-info">
                  <p>Inbox</p>
                  <h2>23</h2>
               </div>
               <button className="btn-primary">See messages</button>
            </div>
          </div>

          <div className="stats-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="stats-card">
                <h3>Stats Card {i}</h3>
              </div>
            ))}
          </div>
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