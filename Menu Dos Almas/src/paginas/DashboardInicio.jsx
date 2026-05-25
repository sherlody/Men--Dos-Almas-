import { useEffect, useState } from "react";

function DashboardHome() {

  const [ventasHoy, setVentasHoy] = useState(0);

  const [mesasHoy, setMesasHoy] = useState([]);

  const [productos, setProductos] = useState([]);

  // =========================================
  // CARGAR DASHBOARD
  // =========================================
  useEffect(() => {

    fetch("http://127.0.0.1:8000/api/dashboard-home")

      .then(res => res.json())

      .then(data => {

        setVentasHoy(data.ventas_hoy);

        setMesasHoy(data.mesas_hoy);

        setProductos(data.productos_preferidos);

      })

      .catch(err => {

        console.error(err);

      });

  }, []);

  return (
    <>

      {/* TOP CARDS */}
      <div className="top-cards">

        {/* VENTAS */}
        <div className="card welcome-card">

          <div className="card-info">

            <p>Ventas</p>

            <h2>Hoy</h2>

          </div>

          <span className="badge">

            ${parseFloat(ventasHoy).toFixed(2)}

          </span>

        </div>

        {/* MESAS */}
        <div className="card inbox-card">

          <div className="card-info">

            <p>Mesas atendidas</p>

            <h2>Hoy</h2>

          </div>

          <div className="flex flex-wrap gap-2 mt-3">

            {mesasHoy.length > 0 ? (

              mesasHoy.map((mesa, index) => (

                <span
                  key={index}
                  className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm"
                >
                  Mesa {mesa}
                </span>

              ))

            ) : (

              <span className="text-gray-400">
                Sin mesas
              </span>

            )}

          </div>

        </div>

      </div>

      {/* PRODUCTOS */}
      <div className="stats-grid">

        {productos.map((producto) => (

          <div
            key={producto.id_producto}
            className="stats-card"
          >

            {/* IMAGEN */}
            <div className="h-40 overflow-hidden rounded-xl mb-4">

              <img
                src={producto.imagens}
                alt=""
                className="w-full h-full object-cover"
              />

            </div>

            {/* NOMBRE */}
            <h3 className="text-xl font-bold">

              {producto.nombre_producto}

            </h3>

            {/* PRECIO */}
            <p className="text-orange-500 font-bold mt-2">

              ${producto.precio}

            </p>

          </div>

        ))}

      </div>

    </>
  );
}

export default DashboardHome;