import { useState } from "react";
import Modal from "../componentes/Modal";

function Usuarios() {
    const [openModal, setOpenModal] = useState(false);
    const camposUsuario = [
    {
        label: "Nombre completo",
        type: "text",
    },
    {
        label: "Correo electrónico",
        type: "email",
    },
    {
        label: "Telefono",
        type: "text",
    },
    {
        label: "Rol",
        type: "text",
    },
    {
        label: "Nombre de usuario",
        type: "text",
    },
    {
        label: "Contraseña",
        type: "password",
    }
    ];

  const usuarios = [
    {
      id: 1,
      nombre: "Sarah Johnson",
      puesto: "Lead Designer",
      img: "https://i.pravatar.cc/100?img=1",
    },
    {
      id: 2,
      nombre: "Michael Chen",
      puesto: "Senior Developer",
      img: "https://i.pravatar.cc/100?img=2",
    },
    {
      id: 3,
      nombre: "Emily Rodriguez",
      puesto: "Product Manager",
      img: "https://i.pravatar.cc/100?img=3",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-indigo-800 to-blue-900 min-h-screen flex items-center justify-center p-4">

      {/* CARD PRINCIPAL */}
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden transition-all duration-300 hover:shadow-3xl animate-fade-in">

        {/* CONTENIDO */}
        <div className="p-6">

          <h2 className="text-2xl font-bold text-indigo-800 mb-4">
            Usuarios registrados
          </h2>

          {/* LISTA USUARIOS */}
          <div className="space-y-4">

            {usuarios.map((usuario) => (

              <div
                key={usuario.id}
                className="flex items-center space-x-4 p-3 bg-indigo-50 rounded-lg transition-all duration-300 hover:bg-indigo-100 hover:scale-105"
              >

                {/* FOTO */}
                <img
                  src={usuario.img}
                  alt={usuario.nombre}
                  className="w-12 h-12 rounded-full border-2 border-indigo-800"
                />

                {/* INFO */}
                <div>
                  <h3 className="text-lg font-semibold text-indigo-800">
                    {usuario.nombre}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {usuario.puesto}
                  </p>
                </div>

              </div>

            ))}

          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 bg-indigo-100 flex justify-between items-center">

          <span className="text-sm text-indigo-800">
            {usuarios.length} usuarios
          </span>

          <button onClick={() => setOpenModal(true)} className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300">
            Agregar usuario
          </button>
          {openModal && (
        <Modal
          titulo="Nuevo usuario"
          campos={camposUsuario}
          onClose={() => setOpenModal(false)}
          onSubmit={(e) => {
            e.preventDefault();
            alert("Usuario guardado");
          }}
        />
      )}

        </div>
      </div>
    </div>
  );
}

export default Usuarios;