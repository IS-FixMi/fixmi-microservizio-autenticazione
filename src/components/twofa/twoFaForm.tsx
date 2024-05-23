import React, { useEffect, useState } from "react";
import { twoFaRequest } from "../../utils/connection";
import Status from "../../utils/statusEnum";
import { useErrorBoundary } from "react-error-boundary";

function TwoFaForm({ email, setTwofa, setStatus }) {
  const [res, setRes] = useState([]);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const fetchData = async () => {
      await fetch(twoFaRequest(email))
        .then(
          response => {
            setRes(response.body);
          },
          error => {
            showBoundary(error);
          }
        )
    }
    fetchData();
  }, [email, showBoundary]);

  async function handleSubmit(e) {
    e.preventDefault();
    const twofa = e.target.elements.code.value;
    setTwofa(twofa);
    setStatus(Status.TwoFaSubmitted);
  }

  return (
    <div className="flex justify-center items-center h-full pt-20 pb-20">
      <div className="w-3/4 lg:w-3/4 xl:w-2/4">
        <div className="max-w-xl mx-auto rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Autenticazione a due fattori</div>
            <p className="text-gray-700 text-base">
              Perfavore inserisci il codice di autenticazione a due fattori che è stato inviato al tuo indirizzo email
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
                  Codice
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  name="code"
                  placeholder="Inserisci il codice"
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
                  Conferma
                </button>
              </div>
            </form>
            <p className="text-gray-700 text-xs italic">{res.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TwoFaForm;

