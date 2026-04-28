import React, { useState } from 'react'; 
import { HiStar, HiOutlineLogout, HiTrash } from "react-icons/hi"; // Agregué HiTrash para borrar items
import { useNavigate } from "react-router-dom";

function DashboardCliente() {
  const navigate = useNavigate();
  
  // Estado para manejar el carrito/selección del cliente
  const [pedido, setPedido] = useState([]);

  const platos = [
    { id: 1, title: "Sushi Delight", price: 15.50, desc: "Salmon, Rice & Avocado", rating: "4.9", image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80" },
    { id: 2, title: "Creamy Pasta", price: 12.00, desc: "Cream, Cheese & Basil", rating: "4.8", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80" },
    { id: 3, title: "Chocolate Bliss", price: 8.50, desc: "Dark Chocolate & Cream", rating: "5.0", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80" },
    { id: 4, title: "Burger House", price: 10.99, desc: "Beef, Lettuce & Tomato", rating: "4.7", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" },
  ];

  // Función para agregar al pedido
  const agregarAlPedido = (plato) => {
    setPedido([...pedido, { ...plato, tempId: Date.now() }]);
  };

  // Calcular el total
  const total = pedido.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="bg-white w-screen h-screen flex flex-col overflow-hidden font-sans">
      
      {/* HEADER */}
      <header className="bg-[#ff7e21] text-white p-3 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/login")} className="hover:bg-orange-600 p-2 rounded-full transition-colors">
            <HiOutlineLogout size={22} />
          </button>
          <h1 className="text-lg font-bold uppercase tracking-wider">cafeteria dos almas</h1>
        </div>
        <div className="bg-gray-300 text-gray-800 px-5 py-1.5 rounded-lg font-bold text-sm shadow-sm">
          mesa 05
        </div>
      </header>

      <div className="flex flex-1 w-full overflow-hidden p-6 gap-6">
        
        {/* IZQUIERDA: CARTA DINÁMICA */}
        <div className="w-[40%] h-full bg-[#ff7e21] rounded-[40px] flex flex-col items-center justify-center p-8 text-white shadow-lg shrink-0">
          <h2 className="text-5xl font-black mb-4 text-center uppercase">carta dinámica</h2>
          <p className="text-center opacity-90 text-lg">Explora nuestros mejores platillos preparados al momento.</p>
        </div>

        {/* DERECHA: DASHBOARD INTERACTIVO */}
        <div className="w-[60%] h-full flex flex-col overflow-hidden">
          
          <p className="text-gray-400 font-bold mb-2 uppercase text-[10px] tracking-widest">Nuestras Recomendaciones</p>

          {/* 1. SCROLL HORIZONTAL DE PLATOS (La parte que encerraste) */}
          <div className="flex overflow-x-auto gap-4 pb-4 shrink-0 scrollbar-hide">
            {platos.map((plato) => (
              <div key={plato.id} className="min-w-[180px] bg-white rounded-[20px] overflow-hidden shadow-sm border shrink-0">
                <div className="h-24 w-full relative">
                  <img src={plato.image} className="w-full h-full object-cover" alt={plato.title} />
                  <div className="absolute top-1 right-1 bg-white/90 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <HiStar className="text-yellow-500 text-[10px]" />
                    <span className="text-[10px] font-bold">{plato.rating}</span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-xs font-bold text-blue-900 truncate">{plato.title}</h3>
                  <button 
                    onClick={() => agregarAlPedido(plato)}
                    className="w-full mt-2 py-1 border border-[#ff7e21] text-[#ff7e21] rounded-full text-[9px] font-bold hover:bg-[#ff7e21] hover:text-white transition-all">
                    AGREGAR
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 2. ESPACIO PARA VER LO SELECCIONADO (Tu Pedido) */}
          <div className="flex-1 mt-4 flex flex-col overflow-hidden bg-gray-50 rounded-[25px] p-4 border-2 border-dashed border-gray-200">
            <h3 className="text-gray-500 font-black text-xs uppercase mb-3 italic">Tu Pedido Actual:</h3>
            
            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
              {pedido.length === 0 ? (
                <p className="text-gray-300 text-center mt-10 text-sm italic">Aún no has seleccionado nada...</p>
              ) : (
                pedido.map((item) => (
                  <div key={item.tempId} className="bg-white p-3 rounded-xl shadow-sm flex justify-between items-center animate-in fade-in slide-in-from-right-4">
                    <div className="flex items-center gap-3">
                      <img src={item.image} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="text-xs font-bold text-gray-800">{item.title}</p>
                        <p className="text-[10px] text-[#ff7e21] font-bold">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setPedido(pedido.filter(i => i.tempId !== item.tempId))}
                      className="text-red-400 hover:text-red-600 transition-colors">
                      <HiTrash size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* TOTAL Y ORDENAR */}
          <div className="pt-4 flex flex-col items-end gap-3 shrink-0">
            <div className="bg-gray-200 text-gray-700 px-8 py-2 rounded-full text-lg font-black flex gap-4">
              <span>Total:</span>
              <span className="text-[#ff7e21]">${total.toFixed(2)}</span>
            </div>
            <button className="bg-[#ff7e21] text-white w-full py-4 rounded-2xl text-2xl font-black uppercase shadow-md hover:bg-orange-600 active:scale-95 transition-all">
              ordenar ahora
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DashboardCliente;