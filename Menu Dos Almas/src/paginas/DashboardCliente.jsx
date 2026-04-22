import { useState } from 'react';
import { 
  HiOutlineHome, HiOutlineAdjustments, HiOutlineDuplicate, 
  HiOutlineUserCircle, HiOutlineCog, HiOutlineLogout, HiOutlineSearch, HiOutlineBell,
  HiStar 
} from "react-icons/hi";

function DashboardCliente() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[#f0f4ff] min-h-screen font-sans text-[#1a2b6d]">
      
    
    
          {/* SECCIÓN FOOD (Las tarjetas de comida de abajo) */}
          <section className="pb-12">
            <div className="flex flex-col items-center mb-12">
              <p className="text-rose-600 text-xl font-semibold mb-2">Category</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#1a2b6d] text-center">
                Choose Your Best Food
              </h2>
            </div>

            {/* Rejilla de tarjetas de comida - Ordenada en 3 columnas */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-center">
              <FoodCard 
                image="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80"
                title="Sushi Delight"
                desc="Salmon, Rice & Avocado"
                rating="4.9"
              />
              <FoodCard 
                image="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
                title="Creamy Pasta"
                desc="Cream, Cheese & Basil"
                rating="4.8"
              />
              <FoodCard 
                image="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80"
                title="Chocolate Bliss"
                desc="Dark Chocolate & Cream"
                rating="5.0"
              />
            </div>
          </section>
        
      </div>
    
  );
}
// Componentes auxiliares para mantener limpio el código
const SidebarItem = ({ icon, label, active }) => (
  <div className={`flex items-center justify-between p-4 cursor-pointer rounded-2xl transition-all group mb-1
    ${active ? 'bg-rose-50 text-rose-600 shadow-sm' : 'text-gray-400 hover:bg-gray-50 hover:text-rose-600'}`}>
    <div className="flex items-center gap-4">
      <span className="text-2xl">{icon}</span>
      <span className="font-semibold text-sm">{label}</span>
    </div>
    <span className="text-xs transition-transform group-hover:translate-x-1">❯</span>
  </div>
);

const FoodCard = ({ image, title, desc, rating }) => (
  <div className="group w-full max-w-[20rem] bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white">
    <div className="relative h-[15rem] overflow-hidden">
      <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={image} alt={title} />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
        <HiStar className="text-yellow-500 text-lg" />
        <span className="text-sm font-bold text-[#1a2b6d]">{rating}</span>
      </div>
    </div>
    <div className="p-7">
      <h2 className="text-2xl font-bold mb-1 text-[#1a2b6d] group-hover:text-rose-600 transition-colors">{title}</h2>
      <p className="text-gray-400 text-sm mb-6">{desc}</p>
      <button className="w-full py-3.5 border-2 border-rose-500 text-rose-600 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-rose-500 hover:text-white transition-all duration-300">
        Order now
      </button>
    </div>
  </div>
);

export default DashboardCliente;