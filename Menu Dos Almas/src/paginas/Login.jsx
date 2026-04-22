import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  //validar usuario y contraseña localmente
  const handleSubmit = (e) => {
    e.preventDefault(); // evita recarga

    if (user === "sherlin123" && password === "toto-122") {
      navigate("/dashboard"); // 
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <section className="login-section">
      <div className="login-card">
        
        {/* FORMULARIO */}
        <div className="form-side">
          <h2 className="login-title">Iniciar sesión</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              className="login-input"
              type="text"
              placeholder="Usuario"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />

            <input
              className="login-input"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="login-btn" type="submit">
              Iniciar
            </button>
          </form>

          <div className="login-link">¿Olvidaste tu contraseña?</div>
        </div>

        {/* IMAGEN */}
        <div className="image-side">
          <img src="/src/imagenes/logo-DosAlmas.jpeg" alt="login" />
        </div>

      </div>
    </section>
  );
}

export default Login;