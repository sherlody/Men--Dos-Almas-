import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./PaginaPrincipal.css";

function PaginaPrincipal() {
  const [menuOpen, setMenuOpen] = useState(false);
  // Iniciamos con array vacío para que todas las mesas empiecen LIBRES por defecto
  const [mesasOcupadas, setMesasOcupadas] = useState([]); 
  const navigate = useNavigate();

  // 1. Consultar disponibilidad de mesas al cargar la página
  useEffect(() => {
    const checkMesas = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/mesas/estado");
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
        
        const data = await response.json();
        
        // Filtramos las mesas: solo las que tengan disponible como 0, false o "0"
        const ocupadas = data
          .filter(m => m.disponible == 0 || m.disponible === false || m.disponible === "0")
          .map(m => Number(m.num_mesa)); // Convertimos a número para evitar fallos de tipo
        
        setMesasOcupadas(ocupadas);
      } catch (error) {
        console.error("Error consultando disponibilidad:", error);
        // Si hay error de conexión, mantenemos las mesas libres para permitir el flujo
        setMesasOcupadas([]);
      }
    };

    checkMesas();
    
    // Polling cada 10 segundos para actualizar si alguien ocupa una mesa mientras el usuario mira
    const interval = setInterval(checkMesas, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pagina-principal-container">

      {/* HEADER */}
      <header className="pagina-principal-header">
        <h1 className="pagina-principal-title">
          Bienvenido a cafetería "Dos Almas"
        </h1>

        <div style={{ position: "relative" }}>
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {menuOpen && (
            <div className="menu-item" onClick={() => navigate("/login")}>
              Iniciar sesión
            </div>
          )}
        </div>
      </header>

      {/* TEXTO */}
      <p className="pagina-principal-text">
        Por favor elija el número de mesa en el que se encuentra
      </p>

      {/* GRID DE MESAS */}
     <div className="tables-container">
  <div className="tables-grid">

    {[1, 2, 3, 4].map((num) => { // 1. Cambiamos el paréntesis '(' por una llave '{'
      const estaOcupada = mesasOcupadas.includes(num);

      return ( // 2. Agregamos la palabra 'return' y abrimos paréntesis
        <button 
          key={num} 
          className={`table-button ${estaOcupada ? "mesa-ocupada" : ""}`} 
          disabled={estaOcupada} 
          onClick={() => navigate(`/dashboard-cliente/${num}`)}
        >
          <div className="table-label">
            <span>Mesa</span>
            <span className="table-number">
              {num} 
              {estaOcupada && <span className="status-label">Ocupada</span>}
            </span>
          </div>
        </button>
      ); // 3. Cerramos el return
    })} {/* 4. Cerramos la llave y el paréntesis del map */}

  </div>
</div>

    </div>
  );
}

export default PaginaPrincipal;