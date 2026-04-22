import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./PaginaPrincipal.css";

function PaginaPrincipal() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

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

      {/* BOTONES */}
      <div className="tables-container">
        <div className="tables-grid">
          {[1, 2, 3, 4].map((num) => (
            <button key={num} className="table-button" onClick={() => navigate("/dashboard-cliente")}>
              {num}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

export default PaginaPrincipal;