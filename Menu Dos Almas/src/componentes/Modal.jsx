import React from "react";

function Modal({
  titulo,
  campos,
  onClose,
  onSubmit
}) {

  return (

    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">

      <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-xl">

        {/* BOTON CERRAR */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          ✕
        </button>

        {/* TITULO */}
        <h2 className="text-2xl font-bold mb-6">
          {titulo}
        </h2>

        {/* FORMULARIO */}
        <form
          className="space-y-4"
          onSubmit={onSubmit}
        >

          {campos.map((campo, index) => (

            <div key={index}>

              <label className="block mb-2 text-sm font-medium text-gray-700">

                {campo.label}

              </label>

              {/* INPUT */}
              {campo.type !== "select" ? (

                <input
                  type={campo.type}
                  placeholder={campo.placeholder}
                  value={campo.value || ""}
                  onChange={(e) =>
                    campo.onChange(e.target.value)
                  }
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              ) : (

                <select
                  value={campo.value || ""}
                  onChange={(e) =>
                    campo.onChange(e.target.value)
                  }
                  className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >

                  <option value="">
                    Selecciona una categoría
                  </option>

                  {campo.options?.map((opcion) => (

                    <option
                      key={opcion.id_categoria}
                      value={opcion.id_categoria}
                    >
                      {opcion.nombre_categoria}
                    </option>

                  ))}

                </select>

              )}

            </div>

          ))}

          {/* BOTONES */}
          <div className="flex gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 border py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
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