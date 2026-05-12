import React, { useState } from 'react'; 
import { HiStar, HiOutlineLogout, HiTrash } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom"; 

function DashboardCliente() {
  const navigate = useNavigate();
  const { mesaId } = useParams(); 
  const [pedido, setPedido] = useState([]);

  // Definición de las 5 secciones de la Carta Dinámica
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
      id: "recomendaciones", 
      titulo: "Recomendaciones", 
      items: [
        { id: 17, title: "Wrap de Pollo", price: 9.00, rating: "4.8", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400" },
        { id: 18, title: "Pasta Alfredo", price: 12.50, rating: "4.7", image: "https://images.unsplash.com/photo-1645112481338-3560e906424e?w=400" }
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
    },
    { 
      id: "postres", 
      titulo: "Postres", 
      items: [
        { id: 3, title: "Chocolate Bliss", price: 8.50, rating: "5.0", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400" },
        { id: 15, title: "Brownie con Helado", price: 6.50, rating: "4.9", image: "https://images.unsplash.com/photo-1564921922310-fe5583745811?w=400" }
      ]
    }
  ];

  const agregarAlPedido = (item) => {
    setPedido([...pedido, { ...item, tempId: Date.now() }]);
  };

  const total = pedido.reduce((acc, item) => acc + item.price, 0);

  // FUNCIÓN PARA ENVIAR LA ORDEN
  const manejarOrden = () => {
    if (pedido.length === 0) return;

    // Simulación del objeto que llegaría al cocinero
    const nuevaOrden = {
      mesa: mesaId || "00",
      platillos: pedido.map(p => p.title),
      estado: "pendiente"
    };

    console.log("Orden enviada a cocina:", nuevaOrden);
    
    // Alerta visual para el cliente
    alert(`Mesa ${mesaId}: ¡Tu pedido ha sido enviado con éxito!`);
    
    // Limpiar el carrito de la derecha
    setPedido([]);
  };

  return (
    <div className="bg-white w-screen h-screen flex flex-col overflow-hidden font-sans">
      
      {/* HEADER */}
      <header className="bg-[#ff7e21] text-white p-3 flex justify-between items-center shrink-0 shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/")} className="hover:bg-orange-600 p-2 rounded-full transition-colors">
            <HiOutlineLogout size={22} />
          </button>
          <h1 className="text-lg font-bold uppercase tracking-wider">cafeteria dos almas</h1>
        </div>
        <div className="bg-white text-[#ff7e21] px-5 py-1.5 rounded-lg font-black text-sm shadow-sm uppercase tracking-tighter">
          Mesa {mesaId ? mesaId.padStart(2, '0') : "00"}
        </div>
      </header>

      <div className="flex flex-1 w-full overflow-hidden p-6 gap-6">
        
        {/* IZQUIERDA: CARTA DINÁMICA (SCROLL VERTICAL) */}
        <div className="w-[55%] h-full overflow-y-auto pr-2 space-y-6 custom-scrollbar shrink-0">
          {cartaDinamica.map((seccion) => (
            <div key={seccion.id} className="space-y-4">
              <div className="w-full bg-[#ff7e21] rounded-[30px] p-5 text-white shadow-lg">
                <h2 className="text-2xl font-black uppercase tracking-tight">{seccion.titulo}</h2>
              </div>

              <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide px-2">
                {seccion.items.map((item) => (
                  <div key={item.id} className="min-w-[170px] bg-white rounded-[25px] overflow-hidden shadow-md border shrink-0 hover:scale-105 transition-transform duration-300">
                    <div className="h-24 w-full relative">
                      <img src={item.image} className="w-full h-full object-cover" alt={item.title} />
                      <div className="absolute top-1 right-1 bg-white/90 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <HiStar className="text-yellow-500 text-[10px]" />
                        <span className="text-[10px] font-bold text-gray-700">{item.rating}</span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="text-[11px] font-bold text-blue-900 truncate mb-1">{item.title}</h4>
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

        {/* DERECHA: PANEL DE PEDIDO ACTUAL (EL QUE SE LIMPIA) */}
        <div className="flex-1 h-full flex flex-col overflow-hidden bg-gray-50 rounded-[40px] p-6 border-2 border-dashed border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-gray-400 font-black text-sm uppercase italic tracking-widest">Tu Pedido:</h3>
            <span className="bg-[#ff7e21] text-white px-4 py-1 rounded-full text-xs font-bold shadow-sm">
              {pedido.length} items
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {pedido.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-300">
                <p className="text-5xl mb-4">☕</p>
                <p className="text-sm italic font-medium text-center px-4">Elige tus platillos favoritos de la carta...</p>
              </div>
            ) : (
              pedido.map((item) => (
                <div key={item.tempId} className="bg-white p-4 rounded-[25px] shadow-sm flex justify-between items-center border border-gray-100 animate-in fade-in slide-in-from-right-4">
                  <div className="flex items-center gap-4">
                    <img src={item.image} className="w-12 h-12 rounded-xl object-cover shadow-sm" alt={item.title} />
                    <div>
                      <p className="text-xs font-black text-gray-800">{item.title}</p>
                      <p className="text-[11px] text-[#ff7e21] font-bold">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setPedido(pedido.filter(i => i.tempId !== item.tempId))}
                    className="text-red-400 p-2 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <HiTrash size={20} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* TOTAL Y BOTÓN DE ACCIÓN FINAL */}
          <div className="mt-6 pt-6 border-t-2 border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center mb-5 px-2">
              <span className="text-base font-bold text-gray-500 uppercase">Subtotal:</span>
              <span className="text-4xl font-black text-[#ff7e21]">${total.toFixed(2)}</span>
            </div>
            <button 
              disabled={pedido.length === 0}
              onClick={manejarOrden}
              className={`w-full py-5 rounded-[25px] text-2xl font-black uppercase shadow-xl transition-all active:scale-95
                ${pedido.length === 0 ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-[#ff7e21] text-white hover:bg-orange-600 shadow-orange-100'}`}
            >
              ordenar ahora
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DashboardCliente;