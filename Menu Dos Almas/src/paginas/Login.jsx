import "./login.css";

function Login() {
  return (
    <section className="login-section">
      <div className="login-card">
        
        {/* FORMULARIO */}
        <div className="form-side">
          <h2 className="login-title">Iniciar sesión</h2>
          <form className="login-form">
            <input className="login-input" type="text" placeholder="Usuario" />
            <input className="login-input" type="password" placeholder="Contraseña" />
            <button className="login-btn" type="submit">Iniciar</button>
          </form>
          <div className="login-link">¿Olvidaste tu contraseña?</div>
        </div>

        {/* IMAGEN */}
        <div className="image-side">
          <img src="src/imagenes/logo-DosAlmas.jpeg" alt="login" />
        </div>

      </div>
    </section>
  );
}

export default Login;