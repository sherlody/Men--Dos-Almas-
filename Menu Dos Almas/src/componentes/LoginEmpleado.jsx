import "./login.css";

function LoginEmpleado() {
  return (
    <section className="login-container min-h-screen flex justify-center items-center">
      
      <div className="login-card flex max-w-3xl p-5 items-center">
        
        {/* FORMULARIO */}
        <div className="md:w-1/2 px-8">
          <h2 className="login-title font-bold text-3xl">
            Iniciar sesión
          </h2>

          <form className="flex flex-col gap-4">
            <input
              className="login-input p-2 mt-8 rounded-xl"
              type="text"
              name="username"
              placeholder="Usuario"
            />

            <div className="relative">
              <input
                className="login-input p-2 rounded-xl w-full"
                type="password"
                name="password"
                placeholder="Contraseña"
              />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
              </svg>
            </div>

            <button
              className="login-btn text-white py-2 rounded-xl font-medium"
              type="submit"
            >
              Iniciar
            </button>
          </form>

          <div className="mt-10 text-sm border-b border-gray-500 py-5 login-link">
            ¿Olvidaste tu contraseña?
          </div>
        </div>

        {/* IMAGEN */}
        <div className="md:block hidden w-1/2">
          <img
            className="login-img rounded-2xl"
            src="https://images.unsplash.com/photo-1552010099-5dc86fcfaa38"
            alt="login"
          />
        </div>

      </div>
    </section>
  );
}

export default LoginEmpleado;