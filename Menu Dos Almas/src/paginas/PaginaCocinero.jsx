import React, { useState } from 'react';
import { HiOutlineLogout, HiFire, HiCheckCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import './PaginaCocinero.css';

function PaginaCocinero() {
  const navigate = useNavigate();

  // Estados de ejemplo
  const [pedidos, setPedidos] = useState([
    { id: 1, mesa: "04", items: ["Sushi Delight", "Burger House"], estado: "pendiente" },
    { id: 2, mesa: "01", items: ["Pizza Pepperoni"], estado: "pendiente" },
  ]);

  const cambiarEstado = (id, nuevoEstado) => {
    setPedidos(pedidos.map(p => p.id === id ? { ...p, estado: nuevoEstado } : p));
  };

  const eliminarPedido = (id) => {
    setPedidos(pedidos.filter(p => p.id !== id));
  };

  // Función de cierre de sesión corregida según tus rutas
  const handleLogout = () => {
    // navigate("/login") te llevará al componente <Login /> que tienes en la línea 20 de tu App.js
    navigate("/login");
  };

  return (
    <section className="pricing-section">
      {/* NAVBAR SUPERIOR */}
      <nav className="cocinero-navbar">
        <h2 className="nav-title uppercase tracking-tighter">Panel de Cocina - Dos Almas</h2>
        <button className="btn-logout" onClick={handleLogout}>
          <HiOutlineLogout size={20} /> CERRAR SESIÓN
        </button>
      </nav>

      <div className="pricing-container">
        {pedidos.map((pedido) => (
          <div 
            key={pedido.id} 
            className={`pricing-card ${pedido.estado === 'preparando' ? 'card-popular' : 'card-outline'}`}
          >
            {/* Header de la tarjeta */}
            <div className={`card-header ${pedido.estado === 'preparando' ? 'header-popular body-blue' : 'header-white'}`}>
              {pedido.estado === 'preparando' && <p className="popular-badge">EN PREPARACIÓN</p>}
              <p className="plan-name font-bold uppercase">Mesa</p>
              <p className="price">{pedido.mesa}</p>
              <p className="period">ORDEN #{pedido.id}</p>
            </div>

            {/* Cuerpo de la tarjeta con los botones */}
            <div className="card-body body-blue">
              <div className="items-container">
                {pedido.items.map((item, index) => (
                  <p key={index} className="feature text-white font-medium">• {item}</p>
                ))}
              </div>

              <div className="btns-group">
                <button 
                  className={`btn ${pedido.estado === 'pendiente' ? 'btn-yellow' : 'btn-disabled'}`}
                  onClick={() => cambiarEstado(pedido.id, 'preparando')}
                  disabled={pedido.estado !== 'pendiente'}
                >
                  <HiFire /> {pedido.estado === 'pendiente' ? 'COMENZAR' : 'EN PROCESO'}
                </button>

                <button 
                  className={`btn ${pedido.estado === 'preparando' ? 'btn-white' : 'btn-disabled-white'}`}
                  onClick={() => eliminarPedido(pedido.id)}
                  disabled={pedido.estado !== 'preparando'}
                >
                  <HiCheckCircle /> ORDEN LISTA
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PaginaCocinero;