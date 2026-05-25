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
      type: "text",
      value: formData.clave,
      onChange: (valor) =>
        setFormData({
          ...formData,
          clave: valor
        })
    },

    {
      label: "Nombre producto",
      type: "text",
      value: formData.nombre_producto,
      onChange: (valor) =>
        setFormData({
          ...formData,
          nombre_producto: valor
        })
    },

    {
      label: "Precio",
      type: "number",
      value: formData.precio,
      onChange: (valor) =>
        setFormData({
          ...formData,
          precio: valor
        })
    },

    {
      label: "Imagen",
      type: "text",
      placeholder:
        "URL o ruta de imagen",
      value: formData.imagen,
      onChange: (valor) =>
        setFormData({
          ...formData,
          imagen: valor
        })
    },

    {
      label: "Categoría",
      type: "select",
      value: formData.id_categoria,
      options: categorias,
      onChange: (valor) =>
        setFormData({
          ...formData,
          id_categoria: valor
        })
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
          onClose={() =>
            setOpenModal(false)
          }
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
                src={`${window.location.origin}/${producto.imagen}`}
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