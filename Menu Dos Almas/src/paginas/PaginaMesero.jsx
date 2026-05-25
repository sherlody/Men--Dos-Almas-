import React, { useState, useEffect } from 'react';
import {HiOutlineLogout, HiCheckCircle, HiCreditCard} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Notify } from "notiflix";
import './PaginaMesero.css';

function PaginaMesero() {

  const navigate = useNavigate();

  const [pedidos, setPedidos] = useState([]);

  // =====================================
  // CARGAR PEDIDOS
  // =====================================
  const cargarPedidos = () => {

    fetch("http://127.0.0.1:8000/api/pedidos-mesero")

      .then(res => {

        if (!res.ok) {
          throw new Error("Error al obtener pedidos");
        }

        return res.json();

      })

      .then(data => setPedidos(data))

      .catch(err => {
        console.error("Error cargando pedidos:", err);
      });
  };

  // =====================================
  // ACTUALIZACIÓN AUTOMÁTICA
  // =====================================
  useEffect(() => {

    cargarPedidos();

    const intervalo = setInterval(() => {

      cargarPedidos();

    }, 4000);

    return () => clearInterval(intervalo);

  }, []);

  // =====================================
  // CAMBIAR ESTADO
  // =====================================
  const cambiarEstadoBD = async (id, nuevoEstado) => {

    try {

      const respuesta = await fetch(

        `http://127.0.0.1:8000/api/pedido/${id}/estado`,

        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },

          body: JSON.stringify({
            estado: nuevoEstado
          })
        }
      );

      const data = await respuesta.json();

      if (respuesta.ok && data.success) {

        cargarPedidos();

      } else {

        Notify.failure("No se pudo actualizar el pedido.");

      }

    } catch (error) {

      console.error(error);

      Notify.failure("Error de conexión.");

    }
  };

  const cobrarPedido = async (id) => {

  try {

    const respuesta = await fetch(

      `http://127.0.0.1:8000/api/pedido/${id}/cobrar`,

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },

        body: JSON.stringify({

          metodo_pago: "efectivo"

        })
      }
    );

    const data = await respuesta.json();

    if (respuesta.ok && data.success) {

      Notify.info("✅ Venta registrada");

      cargarPedidos();

    } else {

      Notify.failure(data.mensaje);

    }

  } catch (error) {

    console.error(error);

    Notify.failure("Error al cobrar pedido");

  }
};

  // =====================================
  // LOGOUT
  // =====================================
  const handleLogout = () => {

    navigate("/login");

  };

  return (

    <section className="pricing-section">

      {/* NAVBAR */}
      <nav className="mesero-navbar">

        <h2 className="nav-title uppercase tracking-tighter">
          Mesero - Dos Almas
        </h2>

        <button
          className="btn-logout"
          onClick={handleLogout}
        >
          <HiOutlineLogout size={20} />
          CERRAR SESIÓN
        </button>

      </nav>

      {/* CONTENEDOR */}
      <div className="pricing-container">

        {pedidos.length === 0 ? (

          <p className="text-white text-2xl font-bold mt-10">

            No hay pedidos activos por ahora.

          </p>

        ) : (

          pedidos.map((pedido) => {

            const estadoNormalizado =
              pedido.estado.toLowerCase().trim();

            return (

              <div
                key={pedido.id}
                className={`pricing-card 
                  ${estadoNormalizado === 'entregado'
                    ? 'card-popular'
                    : 'card-outline'
                  }`}
              >

                {/* HEADER */}
                <div className={`card-header 
                  ${estadoNormalizado === 'entregado'
                    ? 'header-popular body-blue'
                    : 'header-white'
                  }`}
                >

                  {estadoNormalizado === 'entregado' && (

                    <p className="popular-badge">

                      ENTREGADO

                    </p>

                  )}

                  <p className="plan-name font-bold uppercase">

                    Mesa

                  </p>

                  <p className="price">

                    {pedido.mesa}

                  </p>

                  <p className="period">

                    ORDEN #{pedido.id}

                  </p>

                </div>

                {/* BODY */}
                <div className="card-body body-blue">

                  {/* PRODUCTOS */}
                  <div className="items-container">

                    {pedido.items.map((item, index) => (

                      <p
                        key={index}
                        className="feature text-white font-medium"
                      >

                        • {item}

                      </p>

                    ))}

                  </div>

                  {/* BOTONES */}
                  <div className="btns-group">

                    {/* ENTREGAR */}
                    <button

                      className={`btn 
                        ${estadoNormalizado === 'preparando'
                          ? 'btn-yellow'
                          : 'btn-disabled'
                        }`}

                      onClick={() =>
                        cambiarEstadoBD(
                          pedido.id,
                          'entregado'
                        )
                      }

                      disabled={
                        estadoNormalizado !== 'preparando'
                      }
                    >

                      <HiCheckCircle />

                      ENTREGAR PEDIDO

                    </button>

                    {/* COBRAR */}
                    <button

                      className={`btn 
                        ${estadoNormalizado === 'entregado'
                          ? 'btn-white'
                          : 'btn-disabled-white'
                        }`}

                      onClick={() =>
                        cobrarPedido(pedido.id)
                      }

                      disabled={
                        estadoNormalizado !== 'entregado'
                      }
                    >

                      <HiCreditCard />

                      COBRAR PEDIDO

                    </button>

                  </div>

                </div>

              </div>

            );

          })

        )}

      </div>

    </section>

  );
}

export default PaginaMesero;