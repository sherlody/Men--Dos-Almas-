function Inventario() {
  const productos = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1646753522408-077ef9839300",
      nombre: "Producto 1",
      precio: 149,
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1651950519238-15835722f8bb",
      nombre: "Producto 2",
      precio: 149,
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1651950537598-373e4358d320",
      nombre: "Producto 3",
      precio: 149,
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1651950540805-b7c71869e689",
      nombre: "Producto 4",
      precio: 149,
    },
    {
      id: 5,
      img: "https://images.unsplash.com/photo-1649261191624-ca9f79ca3fc6",
      nombre: "Producto 5",
      precio: 149,
    },
    {
      id: 6,
      img: "https://images.unsplash.com/photo-1649261191606-cb2496e97eee",
      nombre: "Producto 6",
      precio: 149,
    },
  ];

  return (
    <div className="p-10 bg-gray-100 min-h-screen max-w-7xl mx-auto">
      {/* TITULO */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="font-bold text-4xl mb-2">
          Inventario de Productos
        </h1>
      
        {/* BOTON AGREGAR */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-8 hover:bg-blue-700 transition">
          Agregar nuevo producto
        </button>
      </div>


      {/* GRID */}
      <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            
            {/* IMAGEN */}
            <div className="h-72">
              <img
                src={producto.img}
                alt="producto"
                className=" h-full object-cover"
              />
            </div>

            {/* CONTENIDO */}
            <div className="p-5">
              
              <p className="text-gray-400 text-xs uppercase mb-1">
                Brand
              </p>

              <h2 className="text-lg font-bold text-gray-800">
                {producto.nombre}
              </h2>

              {/* PRECIO + BOTON */}
              <div className="flex items-center justify-between mt-4">
                
                <div>
                  <span className="text-lg font-bold text-black">
                    ${producto.precio}
                  </span>
                </div>

                <button className="border px-3 py-1 rounded-lg text-sm hover:bg-gray-100 transition">
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

export default Inventario;