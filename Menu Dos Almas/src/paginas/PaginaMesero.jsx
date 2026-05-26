import React, { useState, useEffect, useRef } from 'react';
import { HiOutlineLogout, HiCheckCircle, HiCreditCard } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Notify } from "notiflix";
import './PaginaMesero.css';

function PaginaMesero() {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  // Ref para rastrear qué mesas ya notificamos y no repetir la alerta cada 4 segundos
  const mesasNotificadas = useRef(new Set());

  // =====================================
  // CARGAR PEDIDOS Y ALERTAS
  // =====================================
  const cargarPedidos = () => {
    fetch("http://127.0.0.1:8000/api/pedidos-mesero")
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener pedidos");
        return res.json();
      })
      .then(data => {
        setPedidos(data);
        verificarAlertasPago(data);
      })
      .catch(err => console.error("Error cargando pedidos:", err));
  };

  // Función para lanzar Notiflix si alguien pide la cuenta
  const verificarAlertasPago = (pedidosActuales) => {
    pedidosActuales.forEach(pedido => {
      if (pedido.solicita_pago && !mesasNotificadas.current.has(pedido.id)) {
        // Notificación de Notiflix
        Notify.warning(`🔔 ¡Mesa ${pedido.mesa} solicita la cuenta!`, {
            timeout: 6000,
            pauseOnHover: true,
        });
        // Lo marcamos como notificado para que no vuelva a salir en el siguiente ciclo de polling
        mesasNotificadas.current.add(pedido.id);
      } else if (!pedido.solicita_pago && mesasNotificadas.current.has(pedido.id)) {
        // Si ya no solicita pago (porque ya pagó), lo quitamos del registro
        mesasNotificadas.current.delete(pedido.id);
      }
    });
  };

  useEffect(() => {
    cargarPedidos();
    const intervalo = setInterval(cargarPedidos, 4000);
    return () => clearInterval(intervalo);
  }, []);

  Notify.init({
    position: 'center-top',
    distance: '20px',
    width: '420px',
    height: 'auto',
    fontSize: '18px',
    borderRadius: '18px',
    clickToClose: false,
    timeout: 10000,
    cssAnimationStyle: 'from-top',
    showOnlyTheLastOne: false,

    success: {
      background: '#22c55e',
    },
  
    info: {
      background: '#f59e0b',
    },
  
    failure: {
      background: '#ef4444',
    }
  });
  
  // =====================================
  // CAMBIAR ESTADO (ENTREGAR Y COBRAR)
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
          body: JSON.stringify({ estado: nuevoEstado })
        }
      );

      const data = await respuesta.json();

      if (respuesta.ok && data.success) {
        if (nuevoEstado === 'pagado') {
            Notify.success("✅ Mesa liberada y pago registrado");
        }
        cargarPedidos();
      } else {
        Notify.failure("No se pudo actualizar el pedido.");
      }
    } catch (error) {
      console.error(error);
      Notify.failure("Error de conexión.");
    }
  };

  // Ajustado para usar la lógica de 'pagado' que libera la mesa en el controlador
  const cobrarPedido = (id) => {
    cambiarEstadoBD(id, 'pagado');
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <section className="pricing-section">
      <nav className="mesero-navbar">
        <h2 className="nav-title uppercase tracking-tighter">
          Mesero - Dos Almas
        </h2>
        <button className="btn-logout" onClick={handleLogout}>
          <HiOutlineLogout size={20} /> CERRAR SESIÓN
        </button>
      </nav>

      <div className="pricing-container">
        {pedidos.length === 0 ? (
          <p className="text-white text-2xl font-bold mt-10">
            No hay pedidos activos por ahora.
          </p>
        ) : (
          pedidos.map((pedido) => {
            const estadoNormalizado = pedido.estado.toLowerCase().trim();

            return (
              <div
                key={pedido.id}
                className={`pricing-card 
                  ${estadoNormalizado === 'listo' ? 'card-popular' : 'card-outline'} 
                  ${pedido.solicita_pago ? 'border-2 border-yellow-400' : ''}`}
              >
                {/* HEADER */}
                <div className={`card-header 
                  ${estadoNormalizado === 'listo' ? 'header-popular body-blue' : 'header-white'}`}
                >
                  {estadoNormalizado === 'listo' && (
                    <p className="popular-badge">LISTO</p>
                  )}
                  <p className="plan-name font-bold uppercase">Mesa</p>
                  <p className="price">{pedido.mesa}</p>
                  <p className="period">ORDEN #{pedido.id}</p>
                </div>

                {/* BODY */}
                <div className="card-body body-blue">
                  <div className="items-container">
                    {pedido.items.map((item, index) => (
                      <p key={index} className="feature text-white font-medium">• {item}</p>
                    ))}
                  </div>

                  {/* ALERTA VISUAL DENTRO DE LA TARJETA */}
                  {pedido.solicita_pago && (
                    <div className="bg-yellow-400 text-black font-black p-3 rounded-xl mb-4 text-center animate-bounce text-xs">
                        💰 SOLICITA LA CUENTA
                    </div>
                  )}

                  <div className="btns-group">
                    {/* ENTREGAR */}
                    <button
                      className={`btn ${estadoNormalizado === 'listo' ? 'btn-yellow' : 'btn-disabled'}`}
                      onClick={() => cambiarEstadoBD(pedido.id, 'entregado')}
                      disabled={estadoNormalizado !== 'listo'}
                    >
                      <HiCheckCircle /> ENTREGAR
                    </button>

                    {/* COBRAR */}
                    <button
                      className={`btn 
                        ${(estadoNormalizado === 'entregado' || pedido.solicita_pago) ? 'btn-white' : 'btn-disabled-white'}`}
                      onClick={() => cobrarPedido(pedido.id)}
                      disabled={estadoNormalizado !== 'entregado' && !pedido.solicita_pago}
                    >
                      <HiCreditCard /> COBRAR
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