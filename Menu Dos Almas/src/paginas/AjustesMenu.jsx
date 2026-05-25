import { useEffect, useState } from "react";
import { Notify } from "notiflix";

function AjustesMenu() {

  // ======================================
  // ESTADOS
  // ======================================
  const [productos, setProductos] = useState([]);

  const [seleccionados, setSeleccionados] = useState([]);

  // ======================================
  // CARGAR PRODUCTOS
  // ======================================
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

  useEffect(() => {

    cargarProductos();

  }, []);

  // ======================================
  // AGREGAR PRODUCTO
  // ======================================
  const agregarProducto = (producto) => {

    // MAXIMO 5
    if (seleccionados.length >= 5) {

      Notify.info(
        "Solo puedes seleccionar máximo 5 productos"
      );

      return;
    }

    // VALIDAR DUPLICADOS
    const existe = seleccionados.some(
      (item) =>
        item.id_producto === producto.id_producto
    );

    if (existe) return;

    setSeleccionados([
      ...seleccionados,
      producto
    ]);
  };

  // ======================================
  // ELIMINAR PRODUCTO
  // ======================================
  const eliminarProducto = (id) => {

    const nuevos = seleccionados.filter(
      (producto) =>
        producto.id_producto !== id
    );

    setSeleccionados(nuevos);
  };

  // ======================================
  // RECOMENDAR PRODUCTOS
  // ======================================
  const recomendarProductos = async () => {

    try {

      // 1. LIMPIAR TODOS
      await fetch(
        "http://127.0.0.1:8000/api/recomendaciones/limpiar",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        }
      );

      // 2. ACTIVAR SOLO LOS SELECCIONADOS
      for (const producto of seleccionados) {

        await fetch(
          `http://127.0.0.1:8000/api/productos-recomendar/${producto.id_producto}/recomendar`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
          }
        );
      }

      Notify.success(
        "Productos recomendados correctamente"
      );

      cargarProductos();

    } catch (error) {

      console.error(error);

      Notify.failure(
        "Error al recomendar productos"
      );

    }
  };

  // ======================================
  // VACIAR RECOMENDACIONES
  // ======================================
  const vaciarSeleccion = async () => {

    try {

      await fetch(
        "http://127.0.0.1:8000/api/recomendaciones/limpiar",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        }
      );

      setSeleccionados([]);

      cargarProductos();

      Notify.info(
        "Recomendaciones eliminadas"
      );

    } catch (error) {

      console.error(error);

      Notify.failure(
        "Error al limpiar recomendaciones"
      );

    }
  };

  return (

    <div className="p-8 bg-gray-100 min-h-screen">

      {/* TITULO */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-800">

          Ajustes de menú

        </h1>

        <p className="text-gray-500 mt-2">

          Selecciona máximo 5 productos recomendados

        </p>

      </div>

      {/* BOTONES */}
      <div className="flex gap-4 mb-8">

        <button
          onClick={recomendarProductos}
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
        >
          Recomendar
        </button>

        <button
          onClick={vaciarSeleccion}
          className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition"
        >
          Vaciar
        </button>

      </div>

      {/* PRODUCTOS SELECCIONADOS */}
      <div className="bg-white rounded-2xl shadow-md p-5 mb-10">

        <h2 className="text-2xl font-semibold mb-5">

          Productos seleccionados

        </h2>

        <div className="grid grid-cols-5 gap-4">

          {[0, 1, 2, 3, 4].map((index) => (

            <div
              key={index}
              className="h-56 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 overflow-hidden"
            >

              {seleccionados[index] ? (

                <div className="relative h-full">

                  {/* ELIMINAR */}
                  <button
                    onClick={() =>
                      eliminarProducto(
                        seleccionados[index].id_producto
                      )
                    }
                    className="absolute top-2 right-2 bg-red-500 text-white w-7 h-7 rounded-full hover:bg-red-600"
                  >
                    ✕
                  </button>

                  {/* IMAGEN */}
                  <img
                    src={seleccionados[index].imagen}
                    alt=""
                    className="w-full h-32 object-cover"
                  />

                  {/* INFO */}
                  <div className="p-2">

                    <h3 className="font-bold text-sm">

                      {
                        seleccionados[index]
                          .nombre_producto
                      }

                    </h3>

                    <p className="text-gray-500 text-sm">

                      $
                      {
                        seleccionados[index]
                          .precio
                      }

                    </p>

                  </div>

                </div>

              ) : (

                <div className="flex items-center justify-center h-full">

                  <span className="text-gray-400 text-sm">

                    Vacío

                  </span>

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

      {/* GRID PRODUCTOS */}
      <div className="grid grid-cols-4 gap-8">

        {productos.map((producto) => {

          const seleccionado =
            seleccionados.some(
              (item) =>
                item.id_producto ===
                producto.id_producto
            );

          return (

            <div
              key={producto.id_producto}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            >

              {/* IMAGEN */}
              <div className="h-72">

                <img
                  src={producto.imagen}
                  alt=""
                  className="w-full h-full object-cover"
                />

              </div>

              {/* CONTENIDO */}
              <div className="p-5">

                <h2 className="text-xl font-bold text-gray-800">

                  {producto.nombre_producto}

                </h2>

                <div className="flex items-center justify-between mt-4">

                  <span className="text-lg font-bold">

                    ${producto.precio}

                  </span>

                  <button
                    onClick={() =>
                      agregarProducto(producto)
                    }
                    disabled={seleccionado}
                    className={`
                      px-4 py-2 rounded-lg text-white transition
                      ${
                        seleccionado
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-orange-500 hover:bg-orange-600"
                      }
                    `}
                  >

                    {seleccionado
                      ? "Seleccionado"
                      : "Seleccionar"}

                  </button>

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}

export default AjustesMenu;