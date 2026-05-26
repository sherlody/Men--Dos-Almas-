import React, { useState, useEffect } from 'react'; 
import { HiOutlineLogout, HiRefresh, HiCreditCard, HiPlus, HiMinus } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom"; 
import { Notify } from "notiflix";
import './PaginaCocinero.css'; 

function DashboardCliente() {
  const navigate = useNavigate();
  const { mesaId } = useParams(); 
  
  const [secciones, setSecciones] = useState({ preferencias: [], recomendados: [], categorias: [] });
  const [loading, setLoading] = useState(true);
  const [pedido, setPedido] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [pestaña, setPestaña] = useState('carrito');
  const [solicitandoPago, setSolicitandoPago] = useState(false);
  const [pedidoActivoId, setPedidoActivoId] = useState(null);
  const [estadoPedido, setEstadoPedido] = useState(null);

  // 1. CARGAR MENÚ
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/menu") 
      .then(response => response.json())
      .then(data => {
        setSecciones(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error cargando el menú:", error);
        setLoading(false);
      });
  }, []);

  // 2. RASTREO DE ESTADOS (Polling a 2 segundos para rapidez)
  useEffect(() => {
    let intervalo;

    if (pedidoActivoId) {
      intervalo = setInterval(() => {
        fetch(`http://127.0.0.1:8000/api/pedido/${pedidoActivoId}/estado`)
          .then(res => res.json())
          .then(data => {
            if (!data.estado) return;
            const nuevoEstado = data.estado.toLowerCase().trim();

            if (nuevoEstado !== estadoPedido) {
              setEstadoPedido(nuevoEstado);

              if (nuevoEstado === 'preparando') {
                Notify.info("👨‍🍳 ¡El cocinero está preparando tu orden!");
              }
              if (nuevoEstado === 'listo') {
                Notify.info("✅ ¡Tu orden está lista!");
              }
              if (nuevoEstado === 'entregado') {
                Notify.success("🍽️ ¡Pedido entregado! Provecho.");
              }
              if (nuevoEstado === 'pagado') {
                Notify.success("💳 ¡Cuenta pagada con éxito! Gracias por su visita.");
                setPedidoActivoId(null);
                setEstadoPedido(null);
                setSolicitandoPago(false);
              }
            }
          })
          .catch(err => console.error("Error al consultar estado:", err));
      }, 2000); 
    }
    return () => clearInterval(intervalo);
  }, [pedidoActivoId, estadoPedido]);

  // Lógica de Carrito
  const agregarAlPedido = (item) => {
    setPedido(prevPedido => {
      const existe = prevPedido.find(p => p.id_producto === item.id_producto);
      if (existe) {
        return prevPedido.map(p => p.id_producto === item.id_producto ? { ...p, cantidad: p.cantidad + 1 } : p);
      }
      return [...prevPedido, { ...item, cantidad: 1 }];
    });
    setPestaña('carrito');
  };

  const quitarDelPedido = (id) => {
    setPedido(prevPedido => {
      const item = prevPedido.find(p => p.id_producto === id);
      if (item && item.cantidad > 1) {
        return prevPedido.map(p => p.id_producto === id ? { ...p, cantidad: p.cantidad - 1 } : p);
      }
      return prevPedido.filter(p => p.id_producto !== id);
    });
  };

  // ENVIAR ORDEN A COCINA
  const manejarOrden = async () => {
    if (pedido.length === 0) return;
    const totalPedido = pedido.reduce((acc, item) => acc + (parseFloat(item.precio) * item.cantidad), 0);
    const datosOrden = {
      id_mesa: parseInt(mesaId) || 1, 
      total: totalPedido,
      productos: pedido 
    };

    try {
      const respuesta = await fetch("http://127.0.0.1:8000/api/ordenar", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(datosOrden)
      });

      const data = await respuesta.json();
      if (respuesta.ok && data.success) {
        setHistorial(prev => {
          let nuevoHistorial = [...prev];
          pedido.forEach(item => {
            const idx = nuevoHistorial.findIndex(h => h.id_producto === item.id_producto);
            if (idx !== -1) nuevoHistorial[idx].cantidad += item.cantidad;
            else nuevoHistorial.push({ ...item });
          });
          return nuevoHistorial;
        });
        
        Notify.success("🚀 ¡Orden enviada!");
        setPedidoActivoId(data.id_pedido);
        setEstadoPedido('pendiente');
        setPedido([]); 
        setPestaña('consumos'); 
      }
    } catch  {
      Notify.failure("Error de conexión al enviar la orden.");
    }
  };

  // SOLICITAR PAGO AL MESERO
  const manejarPago = async () => {
    if (!pedidoActivoId) return;
    try {
      const respuesta = await fetch(`http://127.0.0.1:8000/api/pedido/${pedidoActivoId}/solicitar-pago`, {
        method: "POST", // Cambiado a POST para coincidir con el controlador
        headers: { "Content-Type": "application/json", "Accept": "application/json" }
      });
      const data = await respuesta.json();
      if (respuesta.ok && data.success) {
        setSolicitandoPago(true);
        Notify.warning("🔔 Mesero notificado. Preparando tu cuenta...");
      }
    } catch  {
      Notify.failure("Error al llamar al mesero.");
    }
  };

  const totalActual = pedido.reduce((acc, item) => acc + (parseFloat(item.precio) * item.cantidad), 0);
  const totalHistorico = historial.reduce((acc, item) => acc + (parseFloat(item.precio) * item.cantidad), 0);
  const totalCuenta = totalActual + totalHistorico;

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-orange-500 italic text-2xl">Abriendo carta de Dos Almas...</div>;

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
        {/* LADO IZQUIERDO: MENÚ */}
        <div className="w-[55%] h-full overflow-y-auto pr-2 space-y-6 custom-scrollbar shrink-0">
          {secciones.preferencias?.length > 0 && (
            <section className="space-y-4">
              <div className="w-full bg-[#ff7e21] rounded-[30px] p-5 text-white shadow-lg">
                <h2 className="text-2xl font-black uppercase">Lo más pedido</h2>
              </div>
              <div className="flex overflow-x-auto gap-4 pb-4 px-2">
                {secciones.preferencias.map(item => renderCard(item))}
              </div>
            </section>
          )}

          {secciones.categorias?.map((cat, idx) => (
            <section key={idx} className="space-y-4">
              <div className="w-full bg-gray-800 rounded-[30px] p-5 text-white shadow-lg">
                <h2 className="text-2xl font-black uppercase">{cat.titulo}</h2>
              </div>
              <div className="flex overflow-x-auto gap-4 pb-4 px-2">
                {cat.items.map(item => renderCard(item))}
              </div>
            </section>
          ))}
        </div>

        {/* LADO DERECHO: CARRITO / CONSUMOS */}
        <div className="flex-1 h-full flex flex-col overflow-hidden bg-gray-50 rounded-[40px] p-6 border-2 border-dashed border-gray-200">
          <div className="flex gap-2 mb-6 bg-gray-200 p-1 rounded-full">
            <button onClick={() => setPestaña('carrito')} className={`flex-1 py-2 rounded-full text-[10px] font-black uppercase transition-all ${pestaña === 'carrito' ? 'bg-[#ff7e21] text-white shadow-md' : 'text-gray-500'}`}>
              Carrito ({pedido.reduce((a, b) => a + b.cantidad, 0)})
            </button>
            <button onClick={() => setPestaña('consumos')} className={`flex-1 py-2 rounded-full text-[10px] font-black uppercase transition-all ${pestaña === 'consumos' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500'}`}>
              Consumos
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {pestaña === 'carrito' ? (
              pedido.map((item) => (
                <div key={item.id_producto} className="bg-white p-4 rounded-[25px] shadow-sm flex justify-between items-center border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-xl">☕</div>
                      <span className="absolute -top-2 -right-2 bg-[#ff7e21] text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                        {item.cantidad}
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-800">{item.nombre_producto}</p>
                      <p className="text-[10px] text-[#ff7e21] font-bold">${(parseFloat(item.precio) * item.cantidad).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => quitarDelPedido(item.id_producto)} className="bg-gray-100 p-1 rounded-full text-gray-500 hover:text-red-500"><HiMinus size={14}/></button>
                    <button onClick={() => agregarAlPedido(item)} className="bg-gray-100 p-1 rounded-full text-gray-500 hover:text-green-500"><HiPlus size={14}/></button>
                  </div>
                </div>
              ))
            ) : (
              historial.map((item, index) => (
                <div key={index} className="bg-blue-50 p-4 rounded-[25px] shadow-sm flex justify-between items-center border border-blue-100">
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-lg">x{item.cantidad}</span>
                    <div>
                      <p className="text-[10px] font-black text-blue-900">{item.nombre_producto}</p>
                      <p className="text-[10px] text-blue-600 font-bold">${(parseFloat(item.precio) * item.cantidad).toFixed(2)}</p>
                    </div>
                  </div>
                  <button onClick={() => agregarAlPedido(item)} className="text-orange-500 p-2 hover:bg-white rounded-full transition-all shadow-sm">
                    <HiRefresh size={18}/>
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 pt-6 border-t-2 border-gray-200">
            <div className="flex justify-between items-center mb-5 px-2">
              <span className="text-xs font-black text-gray-400 uppercase">Total Cuenta:</span>
              <span className="text-4xl font-black text-[#ff7e21]">${totalCuenta.toFixed(2)}</span>
            </div>
            <div className="flex flex-col gap-3">
              <button disabled={pedido.length === 0} onClick={manejarOrden} className={`btn ${pedido.length === 0 ? 'btn-disabled' : 'btn-yellow'} !py-4 !text-lg !rounded-[22px]`}>
                ORDENAR AHORA
              </button>
              <button 
                disabled={historial.length === 0 || solicitandoPago} 
                onClick={manejarPago} 
                className={`btn !py-4 !text-lg !rounded-[22px] !border-2 flex items-center justify-center gap-2 transition-all
                  ${historial.length === 0 ? 'btn-disabled-white' : solicitandoPago ? 'bg-green-500 border-green-600 text-white' : 'btn-white !border-blue-600 !text-blue-600'}`}
              >
                {solicitandoPago ? "⌛ MESERO EN CAMINO" : <><HiCreditCard size={24} /> SOLICITAR CUENTA</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function renderCard(item) {
    return (
      <div key={item.id_producto} className="min-w-[170px] bg-white rounded-[25px] overflow-hidden shadow-md border shrink-0 hover:scale-105 transition-transform duration-300">
        <div className="h-24 w-full relative bg-gray-100 flex items-center justify-center">
          {item.imagen ? <img src={item.imagen} className="w-full h-full object-cover" alt={item.nombre_producto} /> : <span className="text-2xl">☕</span>}
        </div>
        <div className="p-3">
          <h4 className="text-[11px] font-bold text-blue-900 truncate">{item.nombre_producto}</h4>
          <p className="text-[#ff7e21] font-bold text-[10px] mb-2">${parseFloat(item.precio).toFixed(2)}</p>
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