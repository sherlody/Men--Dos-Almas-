import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Notify } from "notiflix";
import "./login.css";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        // Redirección por rol
        if (data.usuario.id_rol === 1) {
          navigate("/dashboard");
        }
        else if (data.usuario.id_rol === 2) {
          navigate("/cocinero");
        }
        else if (data.usuario.id_rol === 3) {
          navigate("/mesero");
        }
      } else {
        Notify.failure(data.message);
      }
    } catch (error) {
      console.error(error);
      Notify.failure("Error del servidor");
    }
  };

  //  Verificar si ya hay sesión iniciada
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      // Aquí puedes decidir a dónde redirigir según tu lógica
      navigate("/login");
    }
  }, [navigate]);

  
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
