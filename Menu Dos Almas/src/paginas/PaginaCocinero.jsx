import React, { useState, useEffect } from 'react';
import { HiOutlineLogout, HiFire, HiCheckCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Notify } from "notiflix";
import './PaginaCocinero.css';

function PaginaCocinero() {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);

  // 1. Cargar los pedidos activos desde la API de Laravel
  const cargarPedidos = () => {
    fetch("http://127.0.0.1:8000/api/pedidos-activos") 
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener pedidos");
        return res.json();
      })
      .then(data => setPedidos(data))
      .catch(err => console.error("Error cargando pedidos en cocina:", err));
  };

  // Polling: Actualiza la pantalla de cocina automáticamente cada 4 segundos
  useEffect(() => {
    cargarPedidos(); 
    const intervalo = setInterval(cargarPedidos, 4000); 
    return () => clearInterval(intervalo); 
  }, []);

  // 2. Cambiar estado en la Base de Datos al hacer clic en los botones
  const cambiarEstadoBD = async (id, nuevoEstado) => {
    try {
      const respuesta = await fetch(`http://127.0.0.1:8000/api/pedido/${id}/estado`, { 
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ estado: nuevoEstado })
      });

      const data = await respuesta.json();

      if (respuesta.ok && data.success) {
        cargarPedidos(); // Recargar inmediatamente la pantalla en silencio
      } else {
        Notify.failure("No se pudo actualizar el estado en el servidor.");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      Notify.failure("Error de conexión al cambiar el estado del pedido.");
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <section className="pricing-section">
      <nav className="cocinero-navbar">
        <h2 className="nav-title uppercase tracking-tighter"> Cocina - Dos Almas</h2>
        <button className="btn-logout" onClick={handleLogout}>
          <HiOutlineLogout size={20} /> CERRAR SESIÓN
        </button>
      </nav>

      <div className="pricing-container">
        {pedidos.length === 0 ? (
          <p className="text-white text-2xl font-bold mt-10">Sin pedidos pendientes por ahora. ¡Buen trabajo!</p>
        ) : (
          pedidos.map((pedido) => {
            // Convertimos el estado a minúsculas para evitar errores si Laravel responde "Pendiente" o "PENDIENTE"
            const estadoNormalizado = pedido.estado.toLowerCase().trim();

            return (
              <div 
                key={pedido.id} 
                className={`pricing-card ${estadoNormalizado === 'preparando' ? 'card-popular' : 'card-outline'}`}
              >
                
                <div className={`card-header ${estadoNormalizado === 'preparando' ? 'header-popular body-blue' : 'header-white'}`}>
                  {estadoNormalizado === 'preparando' && <p className="popular-badge">EN PREPARACIÓN</p>}
                  <p className="plan-name font-bold uppercase">Mesa</p>
                  <p className="price">{pedido.mesa}</p>
                  <p className="period">ORDEN #{pedido.id}</p>
                </div>

                <div className="card-body body-blue">
                  <div className="items-container">
                    {pedido.items.map((item, index) => (
                      <p key={index} className="feature text-white font-medium">• {item}</p>
                    ))}
                  </div>

                  <div className="btns-group">
                    {/* BOTÓN COMENZAR */}
                    <button 
                      className={`btn ${estadoNormalizado === 'pendiente' ? 'btn-yellow' : 'btn-disabled'}`}
                      onClick={() => cambiarEstadoBD(pedido.id, 'preparando')}
                      disabled={estadoNormalizado !== 'pendiente'}
                    >
                      <HiFire /> {estadoNormalizado === 'pendiente' ? 'COMENZAR' : 'EN PROCESO'}
                    </button>

                    {/* BOTÓN ORDEN LISTA */}
                    <button 
                      className={`btn ${estadoNormalizado === 'preparando' ? 'btn-white' : 'btn-disabled-white'}`}
                      // Al dar clic, pasa a listo y se le notifica al cliente desde su propio componente
                      onClick={() => cambiarEstadoBD(pedido.id, 'listo')}
                      disabled={estadoNormalizado !== 'preparando'}
                    >
                      <HiCheckCircle /> ORDEN LISTA
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

export default PaginaCocinero;
