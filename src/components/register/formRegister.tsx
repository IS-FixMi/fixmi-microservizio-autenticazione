import React from 'react';

function FormRegister({ onSubmit, samePass }) {
  return (
    <div className="flex justify-center items-center h-full pt-20 pb-20">
      <div className="w-3/4 lg:w-3/4 xl:w-2/4">
        <div className="max-w-xl mx-auto rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Crea un nuovo profilo</div>
            <p className="text-gray-700 text-base">
              Perfavore inserisci le credenziali del tuo nuovo profilo per registrarti
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  name="email"
                  placeholder="Inserisci l'indirizzo email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="password"
                  type="password"
                  placeholder="Inserisci la password"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="repeat_password">
                  Ripeti Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="repeat_password"
                  type="password"
                  placeholder="Ripeti la password"
                  required
                />
              </div>
              <div className="mb-4 justify-around flex">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => {
                    document.getElementsByName("email")[0].value = "";
                    document.getElementsByName("password")[0].value = "";
                    document.getElementsByName("repeat_password")[0].value = "";
                  }}
                >
                  Cancella
                </button>
                <button
                  className="my_button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Registrati
                </button>
              </div>
              <p className="text-red-500 text-xs italic">
                {samePass ? "" : "Le password non coincidono"}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormRegister;

