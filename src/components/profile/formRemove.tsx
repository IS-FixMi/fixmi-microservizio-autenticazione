import React from 'react';

function FormRemove({ onSubmit }) {
  return (
    <div className="flex justify-center items-center h-full pt-20 pb-20">
      <div className="w-3/4 lg:w-3/4 xl:w-2/4">
        <div className="max-w-xl mx-auto rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Rimuovi il tuo profilo</div>
            <p className="text-gray-700 text-base">
              Perfavore inserisci le credenziali del tuo profilo per rimuoverlo
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
              <div className="mb-4 justify-around flex">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Cancella
                </button>
                <button
                  className="my_button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Rimuovi il tuo profilo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormRemove;

