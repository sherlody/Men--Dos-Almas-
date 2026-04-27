import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Validar credenciales y redirigir según el rol
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // 1. Credenciales de Administrador / Dashboard
    if (user === "sherlin123" && password === "toto-122") {
      navigate("/dashboard");
    } 
    
    // 2. Credenciales para la Pagina del Cocinero
    else if (user === "cocinero123" && password === "soul-2026") {
      navigate("/cocinero"); // Asegúrate de que esta ruta esté en tu App.js
    } 
    
    // 3. Fallo de autenticación
    else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <section className="login-section">
      <div className="login-card">
        
        {/* FORMULARIO */}
        <div className="form-side">
          <h2 className="login-title">Iniciar sesión</h2>
          <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>
            Dos Almas - Acceso al Sistema
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              className="login-input"
              type="text"
              placeholder="Usuario"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />

            <input
              className="login-input"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="login-btn" type="submit">
              Iniciar
            </button>
          </form>

          <div className="login-link">¿Olvidaste tu contraseña?</div>
        </div>

        {/* IMAGEN / LOGO */}
        <div className="image-side">
          <img src="/src/imagenes/logo-DosAlmas.jpeg" alt="Logo Dos Almas" />
        </div>

      </div>
    </section>
  );
}

export default Login;