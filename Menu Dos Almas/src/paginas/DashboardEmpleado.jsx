import { useState } from 'react';
import './DashboardEmpleado.css';
import { 
HiOutlineHome, HiOutlineAdjustments, HiOutlineDuplicate, 
  HiOutlineUserCircle, HiOutlineCog, HiOutlineLogout, HiOutlineSearch, HiOutlineBell 
} from "react-icons/hi";

function DashboardEmpleado() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[#f0f4ff] min-h-screen font-sans text-[#1a2b6d]">
      
      {/* HEADER - Barra superior fija */}
      <header className="fixed top-0 left-0 w-full bg-white z-50 px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          {/* Botón hamburguesa para móvil */}
          <button className="lg:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
          <div className="text-2xl font-bold text-[#1a2b6d]">
            Admin<span className="text-[#4e5ba6]">Panel</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <HiOutlineSearch className="text-2xl cursor-pointer text-gray-400" />
          <HiOutlineBell className="text-2xl cursor-pointer text-gray-400" />
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
            <img
              className="w-full h-full object-cover"
              src="https://i.pinimg.com/564x/de/0f/3d/de0f3d06d2c6dbf29a888cf78e4c0323.jpg"
              alt="Profile"
            />
          </div>
        </div>
      </header>

      {/* CONTENEDOR PRINCIPAL - pt-28 para dar espacio al Header */}
      <div className="pt-28 flex flex-row px-8 gap-8 max-w-[1800px] mx-auto items-start">
        
        {/* SIDEBAR - Los bloques blancos redondeados (lo que encerraste en rojo) */}
        <aside className={`fixed lg:static w-[280px] shrink-0 transition-all duration-300 z-40
          ${menuOpen ? "left-4 top-24" : "-left-full"} lg:left-0 flex flex-col gap-6`}>
          
          {/* Bloque de Menú Superior */}
          <div className="bg-white rounded-[35px] shadow-sm p-4 border border-white/50">
            <SidebarItem icon={<HiOutlineHome />} label="Home" active />
            <SidebarItem icon={<HiOutlineAdjustments />} label="Some menu item" />
            <SidebarItem icon={<HiOutlineDuplicate />} label="Another menu item" />
          </div>

          {/* Bloque de Menú Inferior */}
          <div className="bg-white rounded-[35px] shadow-sm p-4 border border-white/50">
            <SidebarItem icon={<HiOutlineUserCircle />} label="Profile" />
            <SidebarItem icon={<HiOutlineCog />} label="Settings" />
            <SidebarItem icon={<HiOutlineLogout />} label="Log out" />
          </div>
        </aside>

        {/* CONTENIDO DERECHO (Main) */}
        <main className="flex-1 min-w-0">
          
          {/* TARJETAS SUPERIORES (Welcome e Inbox) - En una fila */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-[#e0e7ff] rounded-[40px] p-10 flex flex-col justify-between min-h-[250px] shadow-sm">
               <div>
                  <h2 className="text-4xl lg:text-5xl text-[#2d3a8c] font-light">Welcome</h2>
                  <h2 className="text-5xl lg:text-6xl text-[#1a2b6d] font-bold">Dash</h2>
               </div>
               <div className="mt-4">
                  <span className="bg-[#2d3a8c] text-white px-8 py-2 rounded-full text-lg font-medium inline-block">
                    01:51
                  </span>
               </div>
            </div>

            <div className="bg-[#dbeafe] rounded-[40px] p-10 flex flex-col justify-between min-h-[250px] shadow-sm">
               <div>
                  <h2 className="text-4xl lg:text-5xl text-[#2d3a8c] font-light">Inbox</h2>
                  <h2 className="text-5xl lg:text-6xl text-[#1a2b6d] font-bold">23</h2>
               </div>
               <div className="mt-4">
                  <button className="bg-[#1e40af] text-white px-10 py-3 rounded-full text-lg font-bold hover:bg-[#1a368a] transition-all shadow-lg shadow-blue-100">
                    See messages
                  </button>
               </div>
            </div>
          </div>

          {/* STATS CARDS - Rejilla de 3 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-[40px] shadow-sm p-10 h-80 border border-white">
                <h3 className="text-2xl font-bold text-[#2d3a8c]">Stats Card {i}</h3>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

// Componente para los items del Sidebar
const SidebarItem = ({ icon, label, active }) => (
  <div className={`flex items-center justify-between p-4 cursor-pointer rounded-2xl transition-all group mb-1
    ${active ? 'bg-indigo-50 text-[#1a2b6d]' : 'text-gray-400 hover:bg-gray-50 hover:text-[#1a2b6d]'}`}>
    <div className="flex items-center gap-4">
      <span className="text-2xl">{icon}</span>
      <span className="font-semibold text-sm tracking-wide">{label}</span>
    </div>
    <span className={`text-xs transition-transform group-hover:translate-x-1 ${active ? 'text-indigo-600' : 'text-gray-300'}`}>
      ❯
    </span>
  </div>
);

export default DashboardEmpleado;