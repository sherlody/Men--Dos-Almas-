import React, { useState, useEffect } from 'react'; 
import { HiStar, HiOutlineLogout, HiTrash, HiRefresh, HiCreditCard, HiPlus, HiMinus } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom"; 
import './PaginaCocinero.css'; 

function DashboardCliente() {
  const navigate = useNavigate();
  const { mesaId } = useParams(); 
  
  // ESTADOS PARA DATOS DE API
  const [secciones, setSecciones] = useState({ preferencias: [], recomendados: [], categorias: [] });
  const [loading, setLoading] = useState(true);

  // ESTADOS DE CARRITO E HISTORIAL
  const [pedido, setPedido] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [pestaña, setPestaña] = useState('carrito');
  const [solicitandoPago, setSolicitandoPago] = useState(false);

  // CARGAR DATOS DESDE EL BACKEND
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/menu") // Cambia por tu URL real
      .then(response => response.json())
      .then(data => {
        setSecciones(data);
        setLoading(false);
      })
      .catch(error => console.error("Error cargando el menú:", error));
  }, []);

  const agregarAlPedido = (item) => {
    setPedido(prevPedido => {
      const existe = prevPedido.find(p => p.id_producto === item.id_producto);
      if (existe) {
        return prevPedido.map(p => p.id_producto === item.id_producto ? { ...p, cantidad: p.cantidad + 1 } : p);
      }
      return [...prevPedido, { ...item, cantidad: 1 }];
    });
    setPestaña('carrito');
    setSolicitandoPago(false);
  };

  const quitarDelPedido = (id) => {
    setPedido(prevPedido => {
      const item = prevPedido.find(p => p.id_producto === id);
      if (item.cantidad > 1) {
        return prevPedido.map(p => p.id_producto === id ? { ...p, cantidad: p.cantidad - 1 } : p);
      }
      return prevPedido.filter(p => p.id_producto !== id);
    });
  };

  // ... (Funciones manejarOrden y manejarPago se mantienen iguales)

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-orange-500">CARGANDO MENÚ...</div>;

  return (
    <div className="bg-white w-screen h-screen flex flex-col overflow-hidden font-sans">
      <header className="bg-[#ff7e21] text-white p-3 flex justify-between items-center shrink-0 shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/")} className="hover:bg-orange-600 p-2 rounded-full transition-colors">
            <HiOutlineLogout size={22} />
          </button>
          <h1 className="text-lg font-bold uppercase tracking-wider">Cafetería Dos Almas</h1>
        </div>
        <div className="bg-white text-[#ff7e21] px-5 py-1.5 rounded-lg font-black text-sm uppercase">
          Mesa {mesaId ? mesaId.padStart(2, '0') : "00"}
        </div>
      </header>

      <div className="flex flex-1 w-full overflow-hidden p-6 gap-6">
        
        {/* IZQUIERDA: CARTA GENERADA DINÁMICAMENTE */}
        <div className="w-[55%] h-full overflow-y-auto pr-2 space-y-6 custom-scrollbar shrink-0">
          
          {/* 1. SECCIÓN PREFERENCIAS (Lo más pedido) */}
          {secciones.preferencias.length > 0 && (
            <div className="space-y-4">
              <div className="w-full bg-[#ff7e21] rounded-[30px] p-5 text-white shadow-lg">
                <h2 className="text-2xl font-black uppercase tracking-tight">Lo más pedido</h2>
              </div>
              <div className="flex overflow-x-auto gap-4 pb-4 px-2">
                {secciones.preferencias.map(item => renderCard(item))}
              </div>
            </div>
          )}

          {/* 2. SECCIÓN RECOMENDADOS */}
          {secciones.recomendados.length > 0 && (
            <div className="space-y-4">
              <div className="w-full bg-blue-600 rounded-[30px] p-5 text-white shadow-lg">
                <h2 className="text-2xl font-black uppercase tracking-tight">Recomendados</h2>
              </div>
              <div className="flex overflow-x-auto gap-4 pb-4 px-2">
                {secciones.recomendados.map(item => renderCard(item))}
              </div>
            </div>
          )}

          {/* 3. SECCIONES POR CATEGORÍA DE BD */}
          {secciones.categorias.map((cat, idx) => (
            <div key={idx} className="space-y-4">
              <div className="w-full bg-gray-800 rounded-[30px] p-5 text-white shadow-lg">
                <h2 className="text-2xl font-black uppercase tracking-tight">{cat.titulo}</h2>
              </div>
              <div className="flex overflow-x-auto gap-4 pb-4 px-2">
                {cat.items.map(item => renderCard(item))}
              </div>
            </div>
          ))}
        </div>

        {/* ... DERECHA: PANEL DE PEDIDO (Se mantiene igual a la versión anterior) ... */}
      </div>
    </div>
  );

  // Función auxiliar para no repetir código de tarjeta
  function renderCard(item) {
    return (
      <div key={item.id_producto} className="min-w-[170px] bg-white rounded-[25px] overflow-hidden shadow-md border shrink-0 hover:scale-105 transition-transform duration-300">
        <div className="h-24 w-full relative bg-gray-100 flex items-center justify-center">
          {item.imagen ? (
            <img src={item.imagen} className="w-full h-full object-cover" alt={item.nombre_producto} />
          ) : (
            <span className="text-2xl">☕</span>
          )}
        </div>
        <div className="p-3">
          <h4 className="text-[11px] font-bold text-blue-900 truncate">{item.nombre_producto}</h4>
          <p className="text-[#ff7e21] font-bold text-[10px] mb-2">${parseFloat(item.price || item.precio).toFixed(2)}</p>
          <button 
            onClick={() => agregarAlPedido(item)}
            className="w-full py-1.5 border-2 border-[#ff7e21] text-[#ff7e21] rounded-full text-[9px] font-black hover:bg-[#ff7e21] hover:text-white transition-all uppercase">
            agregar
          </button>
        </div>
      </div>
    );
  }
}

export default DashboardCliente;