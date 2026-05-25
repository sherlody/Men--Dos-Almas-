import { useEffect, useState } from "react";
import { Notify } from "notiflix";
import Modal from "../componentes/Modal";

function Usuarios() {

  // =========================================
  // ESTADOS
  // =========================================
  const [usuarios, setUsuarios] = useState([]);

  const [roles, setRoles] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const [modoEdicion, setModoEdicion] = useState(false);

  const [usuarioSeleccionado, setUsuarioSeleccionado] =
    useState(null);

  // =========================================
  // FORMULARIO
  // =========================================
  const [formData, setFormData] = useState({

    nombre: "",

    telefono: "",

    username: "",

    password: "",

    id_rol: ""
  });

  // =========================================
  // CAMPOS MODAL
  // =========================================
  const camposUsuario = [

    {
      label: "Nombre completo",
      name: "nombre",
      type: "text"
    },

    {
      label: "Telefono",
      name: "telefono",
      type: "text"
    },

    {
      label: "Nombre de usuario",
      name: "username",
      type: "text"
    },

    {
      label: "Contraseña",
      name: "password",
      type: "password"
    },

    {
      label: "Rol",
      name: "id_rol",
      type: "select",
      options: roles.map((rol) => ({
        value: rol.id_rol,
        label: rol.nombre_rol
      }))
    }
  ];

  // =========================================
  // CARGAR USUARIOS
  // =========================================
  const cargarUsuarios = () => {

    fetch("http://127.0.0.1:8000/api/usuarios")

      .then(res => res.json())

      .then(data => setUsuarios(data))

      .catch(err => console.error(err));
  };

  // =========================================
  // CARGAR ROLES
  // =========================================
  const cargarRoles = () => {

    fetch("http://127.0.0.1:8000/api/roles")

      .then(res => res.json())

      .then(data => setRoles(data))

      .catch(err => console.error(err));
  };

  // =========================================
  // USE EFFECT
  // =========================================
  useEffect(() => {

    cargarUsuarios();

    cargarRoles();

  }, []);

  // =========================================
  // ABRIR NUEVO
  // =========================================
  const abrirNuevo = () => {

    setModoEdicion(false);

    setUsuarioSeleccionado(null);

    setFormData({

      nombre: "",

      telefono: "",

      username: "",

      password: "",

      id_rol: ""
    });

    setOpenModal(true);
  };

  // =========================================
  // ABRIR EDITAR
  // =========================================
  const abrirEditar = (usuario) => {

    setModoEdicion(true);

    setUsuarioSeleccionado(usuario);

    setFormData({

      nombre: usuario.nombre,

      telefono: usuario.telefono,

      username: usuario.username,

      password: "",

      id_rol: usuario.id_rol
    });

    setOpenModal(true);
  };

  // =========================================
  // HANDLE CHANGE
  // =========================================
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value
    });
  };

  // =========================================
  // GUARDAR
  // =========================================
  const guardarUsuario = async (e) => {

    e.preventDefault();

    try {

      const url = modoEdicion

        ? `http://127.0.0.1:8000/api/usuarios/${usuarioSeleccionado.id_usuario}`

        : "http://127.0.0.1:8000/api/usuarios";

      const metodo = modoEdicion ? "PUT" : "POST";

      const respuesta = await fetch(url, {

        method: metodo,

        headers: {

          "Content-Type": "application/json",

          "Accept": "application/json"
        },

        body: JSON.stringify(formData)
      });

      const data = await respuesta.json();

      if (data.success) {

        Notify.info(
          modoEdicion
            ? "Usuario actualizado"
            : "Usuario creado"
        );

        setOpenModal(false);

        cargarUsuarios();
      }

    } catch (error) {

      console.error(error);
    }
  };

  return (

    <div className=" from-orange-800 to-blue-900 min-h-screen flex items-center justify-center p-4">

      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">

        {/* HEADER */}
        <div className="p-6">

          <h2 className="text-2xl font-bold text-orange-500 mb-4">

            Usuarios registrados

          </h2>

          {/* LISTA */}
          <div className="space-y-4">

            {usuarios.map((usuario) => (

              <div
                key={usuario.id_usuario}
                onClick={() => abrirEditar(usuario)}
                className="flex items-center space-x-4 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 cursor-pointer transition"
              >

                {/* FOTO */}
                <div className="w-12 h-12 rounded-full bg-orange-700 text-white flex items-center justify-center font-bold">

                  {usuario.nombre.charAt(0)}

                </div>

                {/* INFO */}
                <div>

                  <h3 className="text-lg font-semibold text-orange-800">

                    {usuario.nombre}

                  </h3>

                  <p className="text-sm text-gray-600">

                    {usuario.nombre_rol}

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 bg-orange-100 flex justify-between items-center">

          <span className="text-sm text-orange-800">

            {usuarios.length} usuarios

          </span>

          <button
            onClick={abrirNuevo}
            className="bg-orange-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900"
          >

            Agregar usuario

          </button>

        </div>

      </div>

      {/* MODAL */}
      {openModal && (

        <Modal

          titulo={
            modoEdicion
              ? "Editar usuario"
              : "Nuevo usuario"
          }

          campos={camposUsuario}

          formData={formData}

          handleChange={handleChange}

          onClose={() => setOpenModal(false)}

          onSubmit={guardarUsuario}
        />

      )}

    </div>
  );
}

export default Usuarios;