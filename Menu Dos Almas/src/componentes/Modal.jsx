function Modal({
  titulo,
  campos,
  onClose,
  onSubmit,
  formData,
  handleChange
}) {

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-2xl">

        {/* CERRAR */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          ✕
        </button>

        {/* TITULO */}
        <h2 className="text-2xl font-bold mb-6 text-orange-500">
          {titulo}
        </h2>

        {/* FORM */}
        <form
          className="space-y-4"
          onSubmit={onSubmit}
        >

          {campos.map((campo, index) => (

            <div key={index}>

              <label className="block mb-2 text-sm font-semibold text-gray-700">
                {campo.label}
              </label>

              {/* SELECT */}
              {campo.type === "select" ? (

                <select
                  name={campo.name}
                  value={formData[campo.name] || ""}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                >

                  <option value="">
                    Seleccionar
                  </option>

                  {campo.options?.map((option, i) => (

                    <option
                      key={i}
                      value={option.value}
                    >
                      {option.label}
                    </option>

                  ))}

                </select>

              ) : (

                /* INPUT NORMAL */
                <input
                  type={campo.type}
                  name={campo.name}
                  placeholder={campo.placeholder}
                  value={formData[campo.name] || ""}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />

              )}

            </div>

          ))}

          {/* BOTONES */}
          <div className="flex gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 border py-2 rounded-lg hover:bg-gray-100"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
            >
              Guardar
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Modal;