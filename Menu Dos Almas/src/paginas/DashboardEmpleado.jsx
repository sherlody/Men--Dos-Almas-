import { useState } from 'react';
//import './DashboardEmpleado.css';

function DashboardEmpleado() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">

      {/* OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-indigo-900/50 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* HEADER */}
      <header className="fixed w-full bg-white text-indigo-800 z-50 shadow-lg animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between h-16">
          
          <button
            className="p-2 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <div className="text-xl font-bold text-blue-900">
            Admin<span className="text-indigo-800">Panel</span>
          </div>

          <img
            className="w-10 h-10 rounded-full object-cover"
            src="https://i.pinimg.com/564x/de/0f/3d/de0f3d06d2c6dbf29a888cf78e4c0323.jpg"
            alt="Profile"
          />
        </div>
      </header>

      {/* CONTENIDO */}
      <div className="pt-16 max-w-7xl mx-auto flex">

        {/* SIDEBAR */}
        <aside
          className={`fixed lg:static w-[240px] bg-indigo-50 h-[calc(100vh-4rem)] 
          transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 transition-transform duration-300 z-50 p-4`}
        >
          <div className="bg-white rounded-xl shadow-lg mb-6 p-4">
            <a href="#" className="block py-2">Home</a>
            <a href="#" className="block py-2">Menu</a>
            <a href="#" className="block py-2">Otro</a>
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 p-4">

          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            
            <div className="flex-1 bg-indigo-100 rounded-xl p-6 animate-fade-in">
              <h2 className="text-4xl text-blue-900">
                Welcome <br /><strong>Dash</strong>
              </h2>
            </div>

            <div className="flex-1 bg-blue-100 rounded-xl p-6 animate-fade-in">
              <h2 className="text-4xl text-blue-900">
                Inbox <br /><strong>23</strong>
              </h2>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl shadow-lg p-6 h-64 animate-slide-up"
              >
                Card {item}
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}

export default DashboardEmpleado;