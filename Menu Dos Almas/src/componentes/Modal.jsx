function Modal({ titulo, campos, onClose, onSubmit }) {

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">

      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">

        {/* BOTON CERRAR */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        {/* TITULO */}
        <h2 className="text-2xl font-bold mb-6">
          {titulo}
        </h2>

        {/* FORM */}
        <form
          className="space-y-4"
          onSubmit={onSubmit}
        >

          {campos.map((campo, index) => (

            <div key={index}>

              <label className="block mb-2 text-sm font-medium">
                {campo.label}
              </label>

              <input
                type={campo.type}
                placeholder={campo.placeholder}
                className="w-full border p-3 rounded-lg"
              />

            </div>

          ))}

          {/* BOTONES */}
          <div className="flex gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 border py-2 rounded-lg"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="flex-1 bg-purple-700 text-white py-2 rounded-lg"
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