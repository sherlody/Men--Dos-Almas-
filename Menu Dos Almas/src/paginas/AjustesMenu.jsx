// AjustesMenu.jsx
import { useState } from "react";

function AjustesMenu() {

  const productos = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1646753522408-077ef9839300",
      nombre: "Jugo de naranja",
      precio: 149,
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1651950519238-15835722f8bb",
      nombre: "Bebida limón",
      precio: 199,
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1651950537598-373e4358d320",
      nombre: "Energética",
      precio: 220,
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1649261191624-ca9f79ca3fc6",
      nombre: "Café frío",
      precio: 99,
    },
  ];

  // PRODUCTOS SELECCIONADOS
  const [seleccionados, setSeleccionados] = useState([]);

  // AGREGAR PRODUCTO
  const agregarProducto = (producto) => {

    // MAXIMO 5
    if (seleccionados.length >= 5) return;

    // VALIDAR QUE NO EXISTA
    const existe = seleccionados.some(
      (item) => item.id === producto.id
    );

    if (existe) return;

    setSeleccionados([...seleccionados, producto]);
  };

  // ELIMINAR PRODUCTO
  const eliminarProducto = (id) => {
    const nuevosProductos = seleccionados.filter(
      (producto) => producto.id !== id
    );

    setSeleccionados(nuevosProductos);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* TITULO */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Ajustes de menú
        </h1>

        <p className="text-gray-500 mt-2">
          Selecciona productos para mostrarlos en el menú
        </p>
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

                  {/* BOTON ELIMINAR */}
                  <button
                    onClick={() =>
                      eliminarProducto(seleccionados[index].id)
                    }
                    className="absolute top-2 right-2 bg-red-500 text-white w-7 h-7 rounded-full hover:bg-red-600"
                  >
                    ✕
                  </button>

                  {/* IMAGEN */}
                  <img
                    src={seleccionados[index].img}
                    alt=""
                    className="w-full h-32 object-cover"
                  />

                  {/* INFO */}
                  <div className="p-2">

                    <h3 className="font-bold text-sm">
                      {seleccionados[index].nombre}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      ${seleccionados[index].precio}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {productos.map((producto) => {

          // VALIDAR SI YA ESTA SELECCIONADO
          const seleccionado = seleccionados.some(
            (item) => item.id === producto.id
          );

          return (

            <div
              key={producto.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            >

              {/* IMAGEN */}
              <div className="h-72">
                <img
                  src={producto.img}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CONTENIDO */}
              <div className="p-5">

                <h2 className="text-xl font-bold text-gray-800">
                  {producto.nombre}
                </h2>

                <div className="flex items-center justify-between mt-4">

                  <span className="text-lg font-bold">
                    ${producto.precio}
                  </span>

                  <button
                    onClick={() => agregarProducto(producto)}
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
                    {seleccionado ? "Seleccionado" : "Seleccionar"}
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