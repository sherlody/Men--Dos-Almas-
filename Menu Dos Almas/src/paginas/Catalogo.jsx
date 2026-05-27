import { useEffect, useState } from "react";
import Modal from "../componentes/Modal";
import { Notify } from "notiflix";

function Catalogo() {

  // =========================
  // ESTADOS
  // =========================
  const [productos, setProductos] = useState([]);

  const [categorias, setCategorias] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const [productoEditando, setProductoEditando] = useState(null);

  const [formData, setFormData] = useState({
    clave: "",
    nombre_producto: "",
    precio: "",
    imagen: "",
    id_categoria: ""
  });

  // =========================
  // CARGAR PRODUCTOS
  // =========================
  const cargarProductos = async () => {

    try {

      const respuesta = await fetch(
        "http://127.0.0.1:8000/api/productos-obtener"
      );

      const data = await respuesta.json();

      setProductos(data);

    } catch (error) {

      console.error(
        "Error cargando productos:",
        error
      );

    }
  };

  // =========================
  // CARGAR CATEGORIAS
  // =========================
  const cargarCategorias = async () => {

    try {

      const respuesta = await fetch(
        "http://127.0.0.1:8000/api/categorias"
      );

      const data = await respuesta.json();

      setCategorias(data);

    } catch (error) {

      console.error(
        "Error cargando categorías:",
        error
      );

    }
  };

  // =========================
  // USE EFFECT
  // =========================
  useEffect(() => {

    cargarProductos();

    cargarCategorias();

  }, []);

  // =========================
  // NUEVO PRODUCTO
  // =========================
  const nuevoProducto = () => {

    setProductoEditando(null);

    setFormData({
      clave: "",
      nombre_producto: "",
      precio: "",
      imagen: "",
      id_categoria: ""
    });

    setOpenModal(true);
  };

  // =========================
  // EDITAR PRODUCTO
  // =========================
  const editarProducto = (producto) => {

    setProductoEditando(producto);

    setFormData({
      clave: producto.clave || "",
      nombre_producto:
        producto.nombre_producto || "",
      precio: producto.precio || "",
      imagen: producto.imagen || "",
      id_categoria:
        producto.id_categoria || ""
    });

    setOpenModal(true);
  };

  // =========================
    // HANDLE CHANGE
    // =========================
    const handleChange = (e) => {

    setFormData({

        ...formData,

        [e.target.name]: e.target.value

    });

    };

  // =========================
  // GUARDAR PRODUCTO
  // =========================
  const guardarProducto = async (e) => {

    e.preventDefault();

    try {

      let url =
        "http://127.0.0.1:8000/api/productos-guardar";

      let metodo = "POST";

      // EDITAR
      if (productoEditando) {

        url =
          `http://127.0.0.1:8000/api/productos-editar/${productoEditando.id_producto}`;

        metodo = "PUT";
      }

      const respuesta = await fetch(url, {

        method: metodo,

        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },

        body: JSON.stringify(formData)

      });

      const data = await respuesta.json();

      if (respuesta.ok) {

        Notify.success(
          productoEditando
            ? "Producto actualizado"
            : "Producto agregado"
        );

        setOpenModal(false);

        cargarProductos();

      } else {

        Notify.failure(
          data.message ||
          "Error al guardar"
        );

      }

    } catch (error) {

      console.error(error);

      Notify.failure("Error de conexión");

    }
  };

  // =========================
  // CAMPOS DEL MODAL
  // =========================
    const camposProducto = [
    {
        label: "Clave",
        name: "clave",
        type: "text",
        placeholder: "Ingrese clave"
    },

    {
        label: "Nombre producto",
        name: "nombre_producto",
        type: "text",
        placeholder: "Ingrese nombre"
    },

    {
        label: "Precio",
        name: "precio",
        type: "number",
        placeholder: "Ingrese precio"
    },

    {
        label: "Imagen",
        name: "imagen",
        type: "text",
        placeholder: "URL de imagen"
    },

    {
        label: "Categoría",
        name: "id_categoria",
        type: "select",

        options: categorias.map((categoria) => ({
        value: categoria.id_categoria,
        label: categoria.nombre_categoria
        }))
    }

    ];

  return (

    <div className="p-10 bg-gray-100 min-h-screen max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <h1 className="font-bold text-4xl">
          Catálogo de Productos
        </h1>

        <button
          onClick={nuevoProducto}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Agregar nuevo producto
        </button>

      </div>

      {/* MODAL */}
      {openModal && (

        <Modal
        titulo={
            productoEditando
            ? "Editar producto"
            : "Nuevo producto"
        }

        campos={camposProducto}

        formData={formData}

        handleChange={(e) =>
            setFormData({
            ...formData,
            [e.target.name]: e.target.value
            })
        }

        onClose={() => setOpenModal(false)}

        onSubmit={guardarProducto}
        />

      )}

      {/* GRID */}
      <div className="grid grid-cols-4 gap-8">

        {productos.map((producto) => (

          <div
            key={producto.id_producto}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >

            {/* IMAGEN */}
            <div className="h-72 bg-gray-100">

              <img
                src={producto.imagen}
                alt={producto.nombre_producto}
                className="w-full h-full object-cover"
              />

            </div>

            {/* CONTENIDO */}
            <div className="p-5">

              {/* CATEGORIA */}
              <p className="text-gray-400 text-xs uppercase mb-1">

                {producto.categoria?.nombre_categoria ||
                  "Sin categoría"}

              </p>

              {/* NOMBRE */}
              <h2 className="text-lg font-bold text-gray-800">

                {producto.nombre_producto}

              </h2>

              {/* CLAVE */}
              <p className="text-sm text-gray-500 mt-1">

                Clave:
                {" "}
                {producto.clave}

              </p>

              {/* PRECIO */}
              <div className="flex items-center justify-between mt-4">

                <span className="text-lg font-bold text-black">

                  ${producto.precio}

                </span>

                <button
                  onClick={() =>
                    editarProducto(producto)
                  }
                  className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-100 transition"
                >
                  Editar
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Catalogo;