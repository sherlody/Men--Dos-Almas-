import React, { useState } from 'react'; 
import { HiStar, HiOutlineLogout, HiTrash, HiRefresh, HiCreditCard, HiClipboardList, HiPlus, HiMinus } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom"; 
import './PaginaCocinero.css'; 

function DashboardCliente() {
  const navigate = useNavigate();
  const { mesaId } = useParams(); 
  
  // ESTADOS
  const [pedido, setPedido] = useState([]); // Carrito actual agrupado
  const [historial, setHistorial] = useState([]); // Consumos enviados
  const [pestaña, setPestaña] = useState('carrito');
  const [solicitandoPago, setSolicitandoPago] = useState(false);

  const cartaDinamica = [
    { 
      id: "lo-mas-pedido", 
      titulo: "Lo más pedido", 
      items: [
        { id: 1, title: "Sushi Delight", price: 15.50, rating: "4.9", image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400" },
        { id: 4, title: "Burger House", price: 10.99, rating: "4.7", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400" },
        { id: 9, title: "Pizza Pepperoni", price: 13.00, rating: "4.8", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400" }
      ]
    },
    { 
      id: "comida", 
      titulo: "Comida", 
      items: [
        { id: 2, title: "Creamy Pasta", price: 12.00, rating: "4.8", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" },
        { id: 8, title: "Tacos Especial", price: 9.50, rating: "4.9", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400" }
      ]
    },
    { 
      id: "bebidas", 
      titulo: "Bebidas y Café", 
      items: [
        { id: 5, title: "Café Americano", price: 3.50, rating: "4.6", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400" },
        { id: 13, title: "Capuccino", price: 4.50, rating: "4.8", image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400" }
      ]
    }
  ];

  // LOGICA PARA AGREGAR Y AGRUPAR (x1, x2...)
  const agregarAlPedido = (item) => {
    setPedido(prevPedido => {
      const existe = prevPedido.find(p => p.id === item.id);
      if (existe) {
        return prevPedido.map(p => p.id === item.id ? { ...p, cantidad: p.cantidad + 1 } : p);
      }
      return [...prevPedido, { ...item, cantidad: 1 }];
    });
    setPestaña('carrito');
    setSolicitandoPago(false); // Si agrega algo más, cancelamos el estado de "pagando"
  };

  // LOGICA PARA RESTAR CANTIDAD
  const quitarDelPedido = (id) => {
    setPedido(prevPedido => {
      const item = prevPedido.find(p => p.id === id);
      if (item.cantidad > 1) {
        return prevPedido.map(p => p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p);
      }
      return prevPedido.filter(p => p.id !== id);
    });
  };

  // ENVIAR A COCINA
  const manejarOrden = () => {
    if (pedido.length === 0) return;
    
    setHistorial(prevHistorial => {
      let nuevoHistorial = [...prevHistorial];
      pedido.forEach(itemPedido => {
        const index = nuevoHistorial.findIndex(h => h.id === itemPedido.id);
        if (index !== -1) {
          nuevoHistorial[index].cantidad += itemPedido.cantidad;
        } else {
          nuevoHistorial.push({ ...itemPedido });
        }
      });
      return nuevoHistorial;
    });

    alert(`¡Orden enviada! El cocinero ya está trabajando en ella.`);
    setPedido([]);
    setPestaña('consumos');
  };

  // NOTIFICAR PAGO
  const manejarPago = () => {
    setSolicitandoPago(true);
    alert("🔔 Notificación enviada. El mesero se acerca a la Mesa " + (mesaId || "00") + " con la cuenta.");
  };

  const totalActual = pedido.reduce((acc, item) => acc + (item.price * item.cantidad), 0);
  const totalHistorico = historial.reduce((acc, item) => acc + (item.price * item.cantidad), 0);
  const totalCuenta = totalHistorico + totalActual;

  return (
    <div className="bg-white w-screen h-screen flex flex-col overflow-hidden font-sans">
      
      {/* HEADER */}
      <header className="bg-[#ff7e21] text-white p-3 flex justify-between items-center shrink-0 shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/")} className="hover:bg-orange-600 p-2 rounded-full transition-colors">
            <HiOutlineLogout size={22} />
          </button>
          <h1 className="text-lg font-bold uppercase tracking-wider italic">Cafetería Dos Almas</h1>
        </div>
        <div className="bg-white text-[#ff7e21] px-5 py-1.5 rounded-lg font-black text-sm uppercase">
          Mesa {mesaId ? mesaId.padStart(2, '0') : "00"}
        </div>
      </header>

      <div className="flex flex-1 w-full overflow-hidden p-6 gap-6">
        
        {/* IZQUIERDA: CARTA */}
        <div className="w-[55%] h-full overflow-y-auto pr-2 space-y-6 custom-scrollbar shrink-0">
          {cartaDinamica.map((seccion) => (
            <div key={seccion.id} className="space-y-4">
              <div className="w-full bg-[#ff7e21] rounded-[30px] p-5 text-white shadow-lg">
                <h2 className="text-2xl font-black uppercase tracking-tight">{seccion.titulo}</h2>
              </div>
              <div className="flex overflow-x-auto gap-4 pb-4 px-2">
                {seccion.items.map((item) => (
                  <div key={item.id} className="min-w-[170px] bg-white rounded-[25px] overflow-hidden shadow-md border shrink-0 hover:scale-105 transition-transform duration-300">
                    <img src={item.image} className="h-24 w-full object-cover" alt={item.title} />
                    <div className="p-3">
                      <h4 className="text-[11px] font-bold text-blue-900 truncate">{item.title}</h4>
                      <p className="text-[#ff7e21] font-bold text-[10px] mb-2">${item.price.toFixed(2)}</p>
                      <button 
                        onClick={() => agregarAlPedido(item)}
                        className="w-full py-1.5 border-2 border-[#ff7e21] text-[#ff7e21] rounded-full text-[9px] font-black hover:bg-[#ff7e21] hover:text-white transition-all uppercase">
                        agregar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* DERECHA: PANEL DUAL */}
        <div className="flex-1 h-full flex flex-col overflow-hidden bg-gray-50 rounded-[40px] p-6 border-2 border-dashed border-gray-200">
          
          <div className="flex gap-2 mb-6 bg-gray-200 p-1 rounded-full shadow-inner">
            <button onClick={() => setPestaña('carrito')} className={`flex-1 py-2 rounded-full text-[10px] font-black uppercase transition-all ${pestaña === 'carrito' ? 'bg-[#ff7e21] text-white shadow-md' : 'text-gray-500'}`}>
              En Carrito ({pedido.reduce((a, b) => a + b.cantidad, 0)})
            </button>
            <button onClick={() => setPestaña('consumos')} className={`flex-1 py-2 rounded-full text-[10px] font-black uppercase transition-all ${pestaña === 'consumos' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500'}`}>
              Mis Consumos
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {pestaña === 'carrito' ? (
              pedido.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-300 italic text-center">
                  <p className="text-4xl mb-2">🛒</p>
                  <p className="text-[10px] uppercase font-bold">Tu carrito está esperando<br/>algo delicioso</p>
                </div>
              ) : (
                pedido.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-[25px] shadow-sm flex justify-between items-center border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={item.image} className="w-10 h-10 rounded-xl object-cover" alt={item.title} />
                        <span className="absolute -top-2 -right-2 bg-[#ff7e21] text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                          {item.cantidad}
                        </span>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-800">{item.title}</p>
                        <p className="text-[10px] text-[#ff7e21] font-bold">${(item.price * item.cantidad).toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => quitarDelPedido(item.id)} className="bg-gray-100 p-1 rounded-full text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"><HiMinus size={14}/></button>
                      <button onClick={() => agregarAlPedido(item)} className="bg-gray-100 p-1 rounded-full text-gray-500 hover:bg-green-50 hover:text-green-500 transition-colors"><HiPlus size={14}/></button>
                    </div>
                  </div>
                ))
              )
            ) : (
              historial.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-300 italic text-center">
                  <p className="text-4xl mb-2">📋</p>
                  <p className="text-[10px] uppercase font-bold">Aún no has enviado<br/>pedidos a cocina</p>
                </div>
              ) : (
                historial.map((item, index) => (
                  <div key={index} className="bg-blue-50 p-4 rounded-[25px] shadow-sm flex justify-between items-center border border-blue-100">
                    <div className="flex items-center gap-3">
                      <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-lg">x{item.cantidad}</span>
                      <div>
                        <p className="text-[10px] font-black text-blue-900">{item.title}</p>
                        <p className="text-[10px] text-blue-600 font-bold">${(item.price * item.cantidad).toFixed(2)}</p>
                      </div>
                    </div>
                    <button onClick={() => agregarAlPedido(item)} className="text-orange-500 p-2 hover:bg-white rounded-full transition-all shadow-sm">
                      <HiRefresh size={18} />
                    </button>
                  </div>
                ))
              )
            )}
          </div>

          <div className="mt-6 pt-6 border-t-2 border-gray-200">
            <div className="flex justify-between items-center mb-5 px-2">
              <span className="text-xs font-black text-gray-400 uppercase">Total de Cuenta:</span>
              <span className="text-4xl font-black text-[#ff7e21]">${totalCuenta.toFixed(2)}</span>
            </div>
            
            <div className="flex flex-col gap-3">
              <button 
                disabled={pedido.length === 0} 
                onClick={manejarOrden} 
                className={`btn ${pedido.length === 0 ? 'btn-disabled' : 'btn-yellow'} !py-4 !text-lg !rounded-[22px] shadow-lg`}
              >
                ORDENAR AHORA
              </button>

              <button 
                disabled={historial.length === 0 || solicitandoPago} 
                onClick={manejarPago} 
                className={`btn !py-4 !text-lg !rounded-[22px] !border-2 flex items-center justify-center gap-2 transition-all shadow-md
                  ${historial.length === 0 
                    ? 'btn-disabled-white' 
                    : solicitandoPago 
                      ? 'bg-green-500 border-green-600 text-white animate-pulse' 
                      : 'btn-white !border-blue-600 !text-blue-600 hover:bg-blue-50'}`}
              >
                {solicitandoPago ? "✅ MESERO NOTIFICADO" : <><HiCreditCard size={24} /> PAGAR CUENTA</>}
              </button>

              {solicitandoPago && (
                <button 
                  onClick={() => navigate("/login")}
                  className="text-[10px] text-center text-gray-400 underline hover:text-[#ff7e21] transition-colors"
                >
                  Finalizar sesión y salir de la mesa
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCliente;